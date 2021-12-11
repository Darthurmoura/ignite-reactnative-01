import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
  task: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: task.title });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [textInputRef])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
            />
        </TouchableOpacity>
      </View>

          <View style={styles.iconsContainer}>
            {isEditing ? (
              <TouchableOpacity
                onPress={handleCancelEditing}
              >
                <Icon name='x' size={24} color="#b2b2b2"  />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleStartEditing}
              >
                <Image source={editIcon} />
              </TouchableOpacity>
            )}

            <View style={styles.iconsDivider} />

            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(task.id)}
              disabled={isEditing}
            >
              <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    flex: 1,
    marginBottom: 4,
    paddingHorizontal: 24,
  },
  taskMarker: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    height: 16,
    justifyContent: 'center',
    marginRight: 15,
    width: 16,
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    alignItems: 'center',
    backgroundColor: '#1DB863',
    borderRadius: 4,
    height: 16,
    justifyContent: 'center',
    marginRight: 15,
    width: 16,
  },
  taskTextDone: {
    color: '#1DB863',
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'line-through',
  },
  iconsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    height: 24,
    marginHorizontal: 12,
    width: 1,
  },
})