# Predicting Heart Disease Risk: A Comparison of Logistic Regression and Random Forest Models

## Course Information
- **Course:** COSC-2507-F01-26F — Introduction to Data Science with Python  
- **Institution:** Algoma University  
- **Authors:** Piyush Pokhrel, Prashant Dhungana

## Project Overview
This project builds a reproducible machine learning pipeline to predict heart disease risk using the **UCI Heart Failure Clinical Records** dataset.

Dataset citation:
- Chicco, D., & Jurman, G. (2020). *Heart failure clinical records*. UCI Machine Learning Repository. https://doi.org/10.24432/C5Z89R

The workflow compares:
1. **Logistic Regression** as an interpretable baseline (with odds ratio extraction)
2. **Random Forest Classifier** as a more flexible non-linear model (with hyperparameter tuning and feature importance)

The pipeline includes data integrity checks, feature standardization, class imbalance handling, model training, and evaluation with saved visualizations.

## Repository Structure
```
.
├── environment.yml
├── requirements.txt
├── main.py
├── src/
│   ├── data_preprocessing.py
│   ├── models.py
│   └── evaluation.py
└── results/
    ├── benchmark.csv
    └── figures/
```

## Setup

### 1) Create and activate Conda environment
```bash
conda env create -f environment.yml
conda activate cosc2507-heart-risk
```

### 2) (Optional) Install with pip
```bash
pip install -r requirements.txt
```

## Run the Pipeline
Place `heart_failure_clinical_records_dataset.csv` in your preferred location, then run:

```bash
python main.py --data-path /absolute/path/to/heart_failure_clinical_records_dataset.csv
```

Optional arguments:
- `--output-dir` (default: `results`)
- `--cv-folds` (default: `5`)
- `--imbalance-strategy` (`smote` or `class_weight`, default: `smote`)

## Outputs
After execution, the pipeline creates:
- `results/benchmark.csv` — model comparison table (Accuracy, Precision, Recall, F1, ROC-AUC)
- `results/figures/confusion_matrices.png` — side-by-side confusion matrices
- `results/figures/roc_curves.png` — overlaid ROC curves
- `results/logistic_odds_ratios.csv` — logistic regression odds ratios
- `results/random_forest_feature_importance.csv` — random forest feature importances
