from __future__ import annotations

from typing import Dict, Iterable, Tuple

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, StratifiedKFold


def train_logistic_regression(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    class_weight: Dict[int, float] | str | None = None,
    random_state: int = 42,
) -> LogisticRegression:
    """Train a logistic regression baseline model."""
    model = LogisticRegression(
        max_iter=1000,
        class_weight=class_weight,
        solver="liblinear",
        random_state=random_state,
    )
    model.fit(X_train, y_train)
    return model


def extract_odds_ratios(model: LogisticRegression, feature_names: Iterable[str]) -> pd.DataFrame:
    """Extract odds ratios from a fitted logistic regression model."""
    coefficients = model.coef_[0]
    odds_ratios = np.exp(coefficients)

    return pd.DataFrame(
        {
            "feature": list(feature_names),
            "coefficient": coefficients,
            "odds_ratio": odds_ratios,
        }
    ).sort_values(by="odds_ratio", ascending=False)


def tune_random_forest(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    cv: StratifiedKFold,
    param_grid: Dict[str, list] | None = None,
    random_state: int = 42,
    n_jobs: int = -1,
) -> Tuple[GridSearchCV, RandomForestClassifier]:
    """Run GridSearchCV for random forest and return search object and best estimator."""
    search_grid = param_grid or {
        "n_estimators": [100, 200],
        "max_depth": [None, 5, 10],
        "min_samples_split": [2, 5],
        "min_samples_leaf": [1, 2],
        "max_features": ["sqrt", "log2"],
    }

    estimator = RandomForestClassifier(random_state=random_state)
    search = GridSearchCV(
        estimator=estimator,
        param_grid=search_grid,
        cv=cv,
        scoring="roc_auc",
        n_jobs=n_jobs,
        verbose=0,
    )
    search.fit(X_train, y_train)

    return search, search.best_estimator_


def extract_feature_importance(
    model: RandomForestClassifier,
    feature_names: Iterable[str],
) -> pd.DataFrame:
    """Return sorted feature importances for a trained random forest model."""
    return pd.DataFrame(
        {
            "feature": list(feature_names),
            "importance": model.feature_importances_,
        }
    ).sort_values(by="importance", ascending=False)
