# Options Sentinel

![Options Sentinel Banner](img/banner.png)

## Autonomous AI Options Trading System

Options Sentinel is an AI-powered options trading system designed to explore how multi-agent reasoning can be combined with deterministic risk controls and controlled trade execution.

The system separates **analysis, decision-making, risk validation, and execution** into distinct stages. AI agents analyse market conditions and evaluate opportunities, while deterministic risk controls provide the final validation before a trade can proceed.

The project currently uses **Alpaca Paper Trading** through an Alpaca MCP-based execution workflow.

> **Core principle:** AI can analyse opportunities, but risk controls decide whether a trade is allowed.

---

## Overview

Options Sentinel provides a structured trading workflow in which specialised agents analyse market conditions, consider opposing perspectives, evaluate risk, and generate an options strategy before execution.

The workflow includes:

* Market analysis
* Multi-agent reasoning
* Bull and bear analysis
* Risk evaluation
* Decision validation
* Options strategy generation
* Controlled paper-trading execution
* Trade decision logging

The architecture is designed to keep the reasoning process structured while ensuring that trade execution remains subject to explicit risk controls.

---

## System Architecture

The system follows a sequential decision pipeline with a dedicated risk gate between AI decision-making and trade execution.

```text
                              MARKET DATA
                                   |
                                   v
                         +------------------+
                         |   Market Agent   |
                         +------------------+
                                   |
                                   v
              +-----------------------------------------+
              |              AGENT DEBATE                |
              |                                         |
              |   +---------------+  +---------------+  |
              |   |  Bull Agent   |  |  Bear Agent   |  |
              |   +---------------+  +---------------+  |
              |          \                  /            |
              |           \                /             |
              +------------\--------------/--------------+
                                   |
                                   v
                         +------------------+
                         |    Risk Agent    |
                         +------------------+
                                   |
                                   v
                         +------------------+
                         |  Decision Agent  |
                         +------------------+
                                   |
                                   v
                    +---------------------------+
                    |         RISK GATE          |
                    |                           |
                    |   Deterministic Risk      |
                    |       Validation          |
                    +---------------------------+
                                   |
                              Approved?
                                   |
                                   v
                    +---------------------------+
                    |  Options Strategy Engine  |
                    +---------------------------+
                                   |
                                   v
                    +---------------------------+
                    |    MCP Execution Layer     |
                    +---------------------------+
                                   |
                                   v
                    +---------------------------+
                    |   Alpaca Paper Trading    |
                    +---------------------------+
                                   |
                                   v
                         +------------------+
                         |   Trade Journal  |
                         +------------------+
```

### Why the Risk Gate Matters

The architecture intentionally places deterministic risk validation between the AI decision process and the execution layer.

An AI-generated decision does not directly become a trade. The proposed trade must first pass through the project's risk validation process before reaching the options strategy and execution stages.

---

## Core Components

### Market Agent

Analyses the available market information and provides the initial market assessment used by the downstream agents.

### Bull Agent

Evaluates the market from a bullish perspective and identifies reasons that may support a potential trade.

### Bear Agent

Challenges the bullish thesis by analysing opposing market conditions and potential downside scenarios.

### Risk Agent

Evaluates the proposed opportunity from a risk perspective before the final decision is made.

### Decision Agent

Combines the preceding analysis and produces the system's trading decision.

### Risk Gate

Acts as the deterministic control layer between AI decision-making and execution.

Its purpose is to ensure that AI reasoning alone does not determine whether a trade is executed.

### Options Strategy Engine

Generates an options strategy based on the validated trading decision.

### MCP Execution Layer

Connects the approved strategy to the execution workflow using the Alpaca MCP integration.

### Alpaca Paper Trading

The project uses Alpaca Paper Trading for controlled execution rather than live trading.

---

## Technology Stack

| Technology              | Purpose                                |
| ----------------------- | -------------------------------------- |
| Python                  | Core application and AI logic          |
| FastAPI                 | Backend API services                   |
| Alpaca API              | Trading and market-related integration |
| Alpaca MCP Server       | MCP-based execution workflow           |
| HTML / CSS / JavaScript | Frontend interface                     |
| Pytest                  | Testing                                |

---

## Repository Structure

Options Sentinel is maintained across two separate GitHub repositories: one for the backend and one for the frontend.

### Backend Repository

The backend contains the application's Python services, AI agents, market analysis, risk management, options strategy logic, execution workflow, and FastAPI services.

**Repository:**
[Options Sentinel Backend Repository](https://github.com/RR0327/options-sentinel)

```text
backend/
├── agents/       AI decision agents
├── market/       Market data and analysis
├── options/      Options strategy engine
├── risk/         Risk management system
├── execution/    MCP and Alpaca execution
├── monitoring/   Position monitoring
├── backend/      FastAPI services
└── ...
```

### Frontend Repository

The frontend provides the user-facing interface for interacting with and monitoring the system.

The frontend is maintained independently from the backend.

**Repository:**
[Options Sentinel Frontend Repository](https://github.com/RR0327/options-sentinel-frontend.git)

---

## Live Deployment

The backend and frontend are deployed independently.

### Backend

[Options Sentinel Backend](https://options-sentinel.onrender.com/)

The backend is deployed on **Render**.

### Frontend

[Options Sentinel Frontend](https://options-sentinel-frontend.vercel.app/)

The frontend is deployed on **Vercel**.

This separation allows the frontend and backend to be maintained and deployed independently.

---

## Installation

### Backend

Clone the backend repository:

```bash
git clone https://github.com/RR0327/options-sentinel.git
cd options-sentinel
```

Create a Python virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install the project dependencies:

```bash
pip install -r requirements.txt
```

### Frontend

The frontend is maintained in a separate repository:

```bash
git clone https://github.com/RR0327/options-sentinel-frontend.git
cd options-sentinel-frontend
```

The frontend and backend can therefore be developed and maintained independently.

---

## Configuration

Create a `.env` file in the backend project and provide the required Alpaca configuration:

```env
ALPACA_API_KEY=
ALPACA_SECRET_KEY=
ALPACA_PAPER=true
```

The project is configured to use Alpaca Paper Trading.

---

## Running the Backend

Start the backend application using:

```bash
python run.py
```

The exact runtime behaviour depends on the configuration and implementation contained in the backend repository.

---

## Testing

Run the project's test suite with:

```bash
pytest
```

---

## Trading Workflow

The complete decision flow can be summarised as:

```text
Market Data
     |
     v
Market Analysis
     |
     v
Bull / Bear Debate
     |
     v
Risk Evaluation
     |
     v
Trading Decision
     |
     v
Deterministic Risk Gate
     |
     v
Options Strategy
     |
     v
MCP Execution
     |
     v
Alpaca Paper Trading
     |
     v
Trade Journal
```

This workflow keeps the reasoning process structured and separates the AI decision layer from the final risk-controlled execution layer.

---

## Design Philosophy

Options Sentinel is built around a clear separation of responsibilities:

```text
                         AI AGENTS
                            |
                            | Analyse
                            v
                     TRADING DECISION
                            |
                            | Validate
                            v
                      RISK CONTROLS
                            |
                            | Approve
                            v
                        EXECUTION
```

The AI components focus on analysing and reasoning about potential opportunities. The risk layer provides a separate control point before execution.

This separation is intended to make the system easier to understand, test, and extend.

---

## Project Status

Options Sentinel is currently designed for **paper trading** and experimentation.

The project focuses on combining:

* Multi-agent reasoning
* Deterministic risk controls
* Options strategy generation
* MCP-based execution
* Explainable trade decisions

---

## Disclaimer

Options Sentinel is an educational and research project.

It uses **Alpaca Paper Trading** and is not intended to provide financial advice or serve as a recommendation to buy or sell financial instruments.

Trading options involves significant risk. The system should not be used for live trading without appropriate testing, validation, and risk assessment.

---

## License

This project is licensed under the MIT License.
