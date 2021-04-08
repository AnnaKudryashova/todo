import { LightningElement, api } from 'lwc';

export default class TodoTile extends LightningElement {
    @api todo;
    @api className;

    get alertClassName() {
        return this.todo.LabApp__Category__c ? 'alert ' + this.todo.LabApp__Category__c : 'alert';
    }
}