from __future__ import annotations

from pathlib import Path
from typing import Dict, List

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)


def compute_metrics(y_true, y_pred, y_score) -> Dict[str, float]:
    """Compute standard binary classification metrics."""
    return {
        "Accuracy": accuracy_score(y_true, y_pred),
        "Precision": precision_score(y_true, y_pred, zero_division=0),
        "Recall": recall_score(y_true, y_pred, zero_division=0),
        "F1-Score": f1_score(y_true, y_pred, zero_division=0),
        "ROC-AUC": roc_auc_score(y_true, y_score),
    }


def create_benchmark_dataframe(results_by_model: Dict[str, Dict[str, float]]) -> pd.DataFrame:
    """Convert per-model metrics dictionary into a benchmark DataFrame."""
    benchmark_df = pd.DataFrame(results_by_model).T
    benchmark_df.index.name = "Model"
    return benchmark_df.reset_index()


def save_confusion_matrices(
    y_true,
    predictions_by_model: Dict[str, List[int]],
    save_path: str | Path,
) -> None:
    """Save side-by-side confusion matrices for multiple models."""
    save_path = Path(save_path)
    save_path.parent.mkdir(parents=True, exist_ok=True)

    num_models = len(predictions_by_model)
    fig, axes = plt.subplots(1, num_models, figsize=(6 * num_models, 5))
    if num_models == 1:
        axes = [axes]

    for ax, (model_name, y_pred) in zip(axes, predictions_by_model.items()):
        cm = confusion_matrix(y_true, y_pred)
        sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", cbar=False, ax=ax)
        ax.set_title(f"{model_name} Confusion Matrix")
        ax.set_xlabel("Predicted")
        ax.set_ylabel("Actual")

    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close(fig)


def save_roc_curves(
    y_true,
    scores_by_model: Dict[str, List[float]],
    save_path: str | Path,
) -> None:
    """Save overlaid ROC curves for multiple models."""
    save_path = Path(save_path)
    save_path.parent.mkdir(parents=True, exist_ok=True)

    plt.figure(figsize=(8, 6))
    for model_name, y_score in scores_by_model.items():
        fpr, tpr, _ = roc_curve(y_true, y_score)
        auc = roc_auc_score(y_true, y_score)
        plt.plot(fpr, tpr, label=f"{model_name} (AUC={auc:.3f})")

    plt.plot([0, 1], [0, 1], linestyle="--", color="gray", label="Chance")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curves Comparison")
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()
