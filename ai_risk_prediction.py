import torch
import torch.nn as nn
import torch.optim as optim
import sys
import warnings

warnings.filterwarnings("ignore")
# Encode values
severity_map = {
    "Low": 0.0,
    "Medium": 1.0,
    "High": 2.0,
    "Critical": 3.0
}

status_map = {
    "Open": 0.0,
    "In Progress": 1.0,
    "Resolved": 2.0,
    "Investigating": 1.0
}

labels = ["Low Risk", "Medium Risk", "High Risk", "Critical Risk"]

# Tiny training set
X = torch.tensor([
    [0.0, 0.0],  # Low, Open
    [1.0, 1.0],  # Medium, In Progress
    [2.0, 0.0],  # High, Open
    [2.0, 1.0],  # High, In Progress
    [0.0, 2.0],  # Low, Resolved
    [1.0, 2.0],  # Medium, Resolved
    [2.0, 2.0],  # High, Resolved
    [3.0, 0.0],  # Critical, Open
], dtype=torch.float32)

y = torch.tensor([0, 1, 2, 2, 0, 1, 2, 3], dtype=torch.long)

class RiskModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(2, 8)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(8, 4)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

model = RiskModel()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# Train quickly each run
for _ in range(300):
    outputs = model(X)
    loss = criterion(outputs, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# If arguments are passed, predict
if len(sys.argv) >= 3:
    severity = sys.argv[1]
    status = sys.argv[2]

    sev_val = severity_map.get(severity, 0.0)
    stat_val = status_map.get(status, 0.0)

    sample = torch.tensor([[sev_val, stat_val]], dtype=torch.float32)

    with torch.no_grad():
        prediction = torch.argmax(model(sample), dim=1).item()

    print(labels[prediction])
else:
    print("AI model trained successfully")