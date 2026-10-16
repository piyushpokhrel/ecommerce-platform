from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split

from src.data_preprocessing import (
    TARGET_COLUMN,
    apply_smote,
    get_stratified_kfold,
    load_dataset,
    split_features_target,
    standardize_continuous_features,
    verify_data_integrity,
)
from src.evaluation import (
    compute_metrics,
    create_benchmark_dataframe,
    save_confusion_matrices,
    save_roc_curves,
)
from src.models import (
    extract_feature_importance,
    extract_odds_ratios,
    train_logistic_regression,
    tune_random_forest,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Predict heart disease risk using Logistic Regression and Random Forest."
    )
    parser.add_argument("--data-path", required=True, help="Absolute path to dataset CSV file")
    parser.add_argument("--output-dir", default="results", help="Directory for saved outputs")
    parser.add_argument("--cv-folds", type=int, default=5, help="Number of stratified CV folds")
    parser.add_argument(
        "--imbalance-strategy",
        choices=["smote", "class_weight"],
        default="smote",
        help="Class imbalance handling strategy",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    data_path = Path(args.data_path)
    output_dir = Path(args.output_dir)
    figures_dir = output_dir / "figures"

    df = load_dataset(str(data_path))
    integrity_report = verify_data_integrity(df)
    print("Data integrity report:")
    print(pd.DataFrame({"missing_values": integrity_report["missing_values"]}))
    print(f"Duplicate rows: {integrity_report['duplicate_rows']}")

    X, y = split_features_target(df, target_column=TARGET_COLUMN)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        stratify=y,
        random_state=42,
    )

    X_train_scaled, X_test_scaled, _ = standardize_continuous_features(X_train, X_test)

    logistic_class_weight = None
    if args.imbalance_strategy == "smote":
        X_train_balanced, y_train_balanced = apply_smote(X_train_scaled, y_train)
    else:
        X_train_balanced, y_train_balanced = X_train_scaled, y_train
        logistic_class_weight = "balanced"

    cv = get_stratified_kfold(n_splits=args.cv_folds)

    logistic_model = train_logistic_regression(
        X_train_balanced,
        y_train_balanced,
        class_weight=logistic_class_weight,
    )

    rf_param_grid = {
        "n_estimators": [100, 200],
        "max_depth": [None, 5, 10],
        "min_samples_split": [2, 5],
        "min_samples_leaf": [1, 2],
    }

    _, random_forest_model = tune_random_forest(
        X_train_balanced,
        y_train_balanced,
        cv=cv,
        param_grid=rf_param_grid,
    )

    logistic_preds = logistic_model.predict(X_test_scaled)
    logistic_scores = logistic_model.predict_proba(X_test_scaled)[:, 1]

    rf_preds = random_forest_model.predict(X_test_scaled)
    rf_scores = random_forest_model.predict_proba(X_test_scaled)[:, 1]

    benchmark = create_benchmark_dataframe(
        {
            "Logistic Regression": compute_metrics(y_test, logistic_preds, logistic_scores),
            "Random Forest": compute_metrics(y_test, rf_preds, rf_scores),
        }
    )

    output_dir.mkdir(parents=True, exist_ok=True)
    figures_dir.mkdir(parents=True, exist_ok=True)

    benchmark_path = output_dir / "benchmark.csv"
    benchmark.to_csv(benchmark_path, index=False)

    odds_ratio_df = extract_odds_ratios(logistic_model, X_train_balanced.columns)
    odds_ratio_df.to_csv(output_dir / "logistic_odds_ratios.csv", index=False)

    importance_df = extract_feature_importance(random_forest_model, X_train_balanced.columns)
    importance_df.to_csv(output_dir / "random_forest_feature_importance.csv", index=False)

    save_confusion_matrices(
        y_test,
        {
            "Logistic Regression": logistic_preds,
            "Random Forest": rf_preds,
        },
        figures_dir / "confusion_matrices.png",
    )

    save_roc_curves(
        y_test,
        {
            "Logistic Regression": logistic_scores,
            "Random Forest": rf_scores,
        },
        figures_dir / "roc_curves.png",
    )

    print(f"Saved benchmark table to: {benchmark_path}")


if __name__ == "__main__":
    main()
