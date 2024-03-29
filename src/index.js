import './style.css';
import './night-theme.css';
import './day-theme.css';

import './images/icon.png';
import './images/day-and-night1.png';

import Calculator from './modules/Calculator';
import HTMLDrawer from './modules/HTMLDrawer';
import StateManager from './modules/StateManager';

import OperationFactory from './modules/OperationFactory';

import ClearAllCalcOperands from './modules/instruments/ClearAllCalcOperands';

class CalculatorApp {
  drawer;
  calculator;
  snapshotState;

  constructor(drawer, calculator) {
    this.drawer = drawer;
    this.calculator = calculator;
    this.snapshotState = new StateManager();
  }

  processMemoryOperations(event) {
    if (event.target.getAttribute('data-type') === 'data-memory-clear') {
      this.calculator.memory.clear();
      this.drawer.memoryInput.textContent = '';
    }
    if (event.target.getAttribute('data-type') === 'data-memory-add') {
      this.calculator.memory.add(this.drawer.recordInput.textContent);
      this.drawer.memoryInput.textContent = 'M';
    }
    if (event.target.getAttribute('data-type') === 'data-memory-substr') {
      this.calculator.memory.substr(this.drawer.recordInput.textContent);
      this.memoryInput.textContent = 'M';
    }
    if (event.target.getAttribute('data-type') === 'data-memory-recall') {
      this.calculator.currentNum = this.calculator.memory.recall();
      this.drawer.updateScreen(
        this.calculator.prevNum,
        this.calculator.currentNum,
        this.calculator.operation.sign,
      );
    }
  }

  processNumbers(event) {
    // if there's = we renew recordInput ( 5+2=7, then if input 8 => 8, not 87)
    // or for 5^2=25, then "input 3" => 3, not 253
    if (
      (this.calculator.prevNum !== '' && this.calculator.operation.id === '') ||
      this.calculator.operation.type === 'single'
    ) {
      new ClearAllCalcOperands(this.calculator).execute();
      this.drawer.updateScreen(
        this.calculator.prevNum,
        this.calculator.currentNum,
        this.calculator.operation.sign,
      );
    }

    this.drawer.updateCurrentOperand(event.target.textContent);
  }

  processModifyOperation(event) {
    this.calculator.operation.id = event.target.id;
    this.calculator.operation.sign = event.target.getAttribute('data-sign');
    this.calculator.operation.type = 'single';

    const OperationToExecute = new OperationFactory(
      this.calculator.operation.id,
      this.calculator.operation.sign,
      this.calculator.operation.type,
    ).create([this.drawer.recordInput.textContent]);

    if (this.calculator.executeCommand(OperationToExecute)) {
      this.snapshotState.addOperation(OperationToExecute);

      this.drawer.updateScreen(
        this.calculator.prevNum,
        this.calculator.prevNum,
        this.calculator.operation.sign,
      );
    } else {
      this.drawer.recordInput.textContent = 'invalid operation';
      new ClearAllCalcOperands(this.calculator).execute();
    }
  }

  processCalculateOperation(event) {
    // if there's operation to execute
    if (this.calculator.operation.id !== '') {
      const OperationToExecute = new OperationFactory(
        this.calculator.operation.id,
        this.calculator.operation.sign,
        this.calculator.operation.type,
      ).create([this.calculator.prevNum, this.drawer.recordInput.textContent]);

      this.calculator.executeCommand(OperationToExecute);
      this.snapshotState.addOperation(OperationToExecute);

      this.calculator.operation.id = event.target.id;
      this.calculator.operation.sign = event.target.getAttribute('data-sign');
      this.calculator.operation.type = 'pair';

      this.drawer.updateScreen(
        this.calculator.prevNum,
        this.calculator.currentNum,
        this.calculator.operation.sign,
      );

      return;
    }

    console.log(' processCalculateOperation');
    // if there's NO operation to execute
    this.calculator.prevNum = this.drawer.recordInput.textContent;
    this.calculator.operation.id = event.target.id;
    this.calculator.operation.sign = event.target.getAttribute('data-sign');
    this.calculator.operation.type = 'pair';

    console.log(this.calculator);

    this.drawer.updateScreen(
      this.calculator.prevNum,
      this.calculator.currentNum,
      this.calculator.operation.sign,
    );
  }

  processEqualOperation() {
    if (this.calculator.operation.id === '') return; // '5=' =>5 а не error

    const OperationToExecute = new OperationFactory(
      this.calculator.operation.id,
      this.calculator.operation.sign,
      this.calculator.operation.type,
    ).create([this.calculator.prevNum, this.drawer.recordInput.textContent]);

    if (this.calculator.executeCommand(OperationToExecute)) {
      this.snapshotState.addOperation(OperationToExecute);

      this.drawer.updateScreen(
        this.calculator.prevNum,
        this.calculator.prevNum,
        this.calculator.operation.sign,
      );
    } else {
      this.drawer.recordInput.textContent = 'invalid operation';
      new ClearAllCalcOperands(this.calculator).execute();
    }
  }

  start() {
    this.drawer.setTheme();
    this.drawer.renderLayout();

    this.drawer.memoryButtonsWrapper.addEventListener('click', event => {
      if (Number.isNaN(Number(this.drawer.recordInput.textContent))) return;

      this.processMemoryOperations(event);
    });

    this.drawer.allButtonsWrapper.addEventListener('click', event => {
      if (event.target.getAttribute('data-type') === 'data-num') {
        this.processNumbers(event);
      }

      if (event.target.getAttribute('data-type') === 'data-modify-operation') {
        if (Number.isNaN(Number(this.drawer.recordInput.textContent))) return;

        this.processModifyOperation(event);
      }
      if (
        event.target.getAttribute('data-type') === 'data-calculate-operation'
      ) {
        if (Number.isNaN(Number(this.drawer.recordInput.textContent))) return;
        console.log('before processCalculateOperation');
        this.processCalculateOperation(event);
      }

      if (event.target.getAttribute('data-type') === 'data-equal') {
        if (Number.isNaN(Number(this.drawer.recordInput.textContent))) return;
        this.processEqualOperation();
      }

      // rest specific non-automated operations====================
      if (event.target.getAttribute('data-type') === 'data-percent') {
        if (Number.isNaN(this.drawer.recordInput.textContent)) return;
        this.calculator.currentNum =
          this.calculator.prevNum * (this.drawer.recordInput.textContent / 100);

        this.drawer.recordInput.textContent = this.calculator.currentNum;
      }

      if (event.target.getAttribute('data-type') === 'data-plus-minus') {
        if (Number.isNaN(this.drawer.recordInput.textContent)) return;

        this.drawer.recordInput.textContent = -Number(
          this.drawer.recordInput.textContent,
        );
      }

      if (event.target.getAttribute('data-type') === 'data-clear-all') {
        new ClearAllCalcOperands(this.calculator).execute();
        this.drawer.updateScreen('', '0', '');
      }

      if (event.target.getAttribute('data-type') === 'data-clear-entry') {
        if (this.calculator.operation.id === '') {
          this.calculator.prevNum = '';
        }
        this.calculator.currentNum = 0;
        this.drawer.updateScreen(
          this.calculator.prevNum,
          0,
          this.calculator.operation.sign,
        );
      }

      if (event.target.getAttribute('data-type') === 'data-undo') {
        const CommandToUndo = this.snapshotState.getOperation();
        this.calculator.forceState(CommandToUndo);

        this.drawer.updateScreen(
          this.calculator.prevNum,
          this.calculator.currentNum,
          this.calculator.operation.sign,
        );
      }
    });

    this.drawer.changeTheme();
  }
}

new CalculatorApp(new HTMLDrawer('root'), new Calculator()).start();
