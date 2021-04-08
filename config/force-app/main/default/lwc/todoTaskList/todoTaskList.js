import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import getTodoList from '@salesforce/apex/TodoController.getTodoList';
import getSingleTodo from '@salesforce/apex/TodoController.getSingleTodo';
import { reduceErrors } from 'c/ldsUtils';

export default class LdsDeleteRecord extends NavigationMixin(LightningElement) {
    @wire(getSingleTodo) todo;

    navigateToNewTodo() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'LabApp__ToDo__c',
                actionName: 'new'
            }   
        });
    }

    todos;
    error;

    /** Wired Apex result so it can be refreshed programmatically */
    wiredTodosResult;

    @wire(getTodoList)
    wiredTodos(result) {
        this.wiredTodosResult = result;
        if (result.data) {
            this.todos = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.todos = undefined;
        }
    }

    navigateToEditTodo(event) {
        const recordEditId = event.target.dataset.recordid;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordEditId,
                objectApiName: 'LabApp__ToDo__c', // objectApiName is optional
                actionName: 'edit'
            }
        });
    }

    deleteTodo(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task is deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.wiredTodosResult);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
    }
}