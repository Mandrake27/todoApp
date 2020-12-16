import React, { Component } from 'react';

import AppHeader from "../app-header";
import FindPanel from "../find-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItemForm from "../add-item-form";

import './app.css';

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    searchString: '',
    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  findElementIndex(array, id) {
    return array.findIndex(item => item.id === id);
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(id, property) {
    this.setState(({ todoData }) => {
      const idx = this.findElementIndex(todoData, id);
      const updatedItem = {
        ...todoData[idx],
        [property]: !todoData[idx][property]
      };
      const newArray = [
        ...todoData.slice(0, idx),
        updatedItem,
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      }
    });
  }

  toggleImportant = (id) => this.toggleProperty(id, 'important');

  toggleDone = (id) => this.toggleProperty(id, 'done');

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = this.findElementIndex(todoData, id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]
      return {
        todoData: newArray
      }
    });
  }

  search = (arr, searchString) => {
    if (searchString.length === 0) {
      return arr;
    }
   return arr.filter(({ label }) => label.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
  }

  filter = (arr, filter) => {
    switch (filter) {
      case 'active':
        return arr.filter(item => !item.done);
      case 'done':
        return arr.filter(item => item.done);
      default:
        return arr;
    }
  }

  changeSearchString = (searchString) => {
    this.setState({ searchString });
  }

  changeStatusFilter = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todoData, searchString, filter } = this.state;
    const fittingItems = this.filter(this.search(todoData, searchString), filter);
    const doneCount = todoData.reduce((acc, curr) => curr.done ? acc + 1 : acc, 0);
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount }/>
        <div className="top-panel d-flex">
          <FindPanel onSearchChange={ this.changeSearchString }/>
          <ItemStatusFilter
            filter={ filter }
            onFilterChange={ this.changeStatusFilter }
          />
        </div>

        <TodoList
          onToggleDone={ this.toggleDone }
          onToggleImportant={ this.toggleImportant }
          onDeleted={ this.deleteItem }
          todos={ fittingItems }
        />
        <AddItemForm onItemAdded={ this.addItem }/>
      </div>
    );
  }
};