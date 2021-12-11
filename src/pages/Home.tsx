import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (foundTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      return;
    }

    setTasks(prevState => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const modifiedTasks = tasks.map(task => task.id === id ? {...task, done: !task.done} : task);

    setTasks(modifiedTasks);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const modifiedTasks = tasks.map(task => (
      task.id === taskId ? {...task, title: taskNewTitle} : task
    ));

    setTasks(modifiedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {return},
        },
        {
          text: 'Sim',
          onPress: () => setTasks(prevState => prevState.filter(
            task => task.id !== id
          ))
        },
      ],
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})