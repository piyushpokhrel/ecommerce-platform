from __future__ import annotations

from typing import Dict, List, Tuple

import pandas as pd
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler


TARGET_COLUMN = "DEATH_EVENT"
CONTINUOUS_FEATURES = [
    "age",
    "creatinine_phosphokinase",
    "ejection_fraction",
    "platelets",
    "serum_creatinine",
    "serum_sodium",
]


def load_dataset(file_path: str) -> pd.DataFrame:
    """Load the UCI heart failure clinical records dataset from CSV."""
    return pd.read_csv(file_path)


def verify_data_integrity(df: pd.DataFrame) -> Dict[str, object]:
    """Return key integrity checks for missing values, dtypes, and duplicates."""
    return {
        "missing_values": df.isna().sum().to_dict(),
        "data_types": {col: str(dtype) for col, dtype in df.dtypes.items()},
        "duplicate_rows": int(df.duplicated().sum()),
    }


def split_features_target(df: pd.DataFrame, target_column: str = TARGET_COLUMN) -> Tuple[pd.DataFrame, pd.Series]:
    """Split dataset into feature matrix X and target vector y."""
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' was not found in the dataset.")

    X = df.drop(columns=[target_column])
    y = df[target_column]
    return X, y


def standardize_continuous_features(
    X_train: pd.DataFrame,
    X_test: pd.DataFrame,
    continuous_features: List[str] | None = None,
) -> Tuple[pd.DataFrame, pd.DataFrame, StandardScaler]:
    """Standardize selected continuous features using train-fit/test-transform strategy."""
    selected_features = continuous_features or CONTINUOUS_FEATURES

    missing_features = [feature for feature in selected_features if feature not in X_train.columns]
    if missing_features:
        raise ValueError(f"Continuous feature(s) not found in X_train: {missing_features}")

    scaler = StandardScaler()
    X_train_scaled = X_train.copy()
    X_test_scaled = X_test.copy()

    X_train_scaled[selected_features] = scaler.fit_transform(X_train[selected_features])
    X_test_scaled[selected_features] = scaler.transform(X_test[selected_features])

    return X_train_scaled, X_test_scaled, scaler


def apply_smote(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    random_state: int = 42,
) -> Tuple[pd.DataFrame, pd.Series]:
    """Apply SMOTE oversampling to reduce class imbalance in training data."""
    sampler = SMOTE(random_state=random_state)
    X_resampled, y_resampled = sampler.fit_resample(X_train, y_train)

    X_resampled_df = pd.DataFrame(X_resampled, columns=X_train.columns)
    y_resampled_series = pd.Series(y_resampled, name=y_train.name)
    return X_resampled_df, y_resampled_series


def get_stratified_kfold(
    n_splits: int = 5,
    shuffle: bool = True,
    random_state: int = 42,
) -> StratifiedKFold:
    """Create a Stratified K-Fold object for consistent class distribution across folds."""
    return StratifiedKFold(n_splits=n_splits, shuffle=shuffle, random_state=random_state)
