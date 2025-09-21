# Room Assignment System

## Overview

The room assignment system automatically assigns students to classrooms when hosts create rooms. Students are assigned randomly (not by creation time) based on classType participants and room capacity.

## How It Works

### 1. Automatic Assignment During Room Creation

When a host creates a classroom with a `classTypeId`:

```graphql
mutation {
  createClassRoom(
    input: {
      roomNumber: 101
      maxStudents: 30
      mandatNumber: []
      classTypeId: "classTypeId123"
    }
  ) {
    id
    roomNumber
    maxStudents
    mandatNumber
  }
}
```

The system will:

- Create the classroom
- Find unassigned students for the specified classType
- Randomly shuffle the students
- Assign up to `maxStudents` students to the room
- Update StudentAnswer records with the room number
- Add mandat numbers to the classroom

### 2. Manual Assignment

You can also manually assign students to rooms:

```graphql
mutation {
  assignStudentsToRoom(roomId: "roomId123", classTypeId: "classTypeId123") {
    success
    assignedStudentCount
    assignedStudentIds
  }
}
```

### 3. Multiple Room Assignment

Assign students to multiple rooms at once:

```graphql
mutation {
  assignStudentsToMultipleRooms(
    roomIds: ["room1", "room2", "room3"]
    classTypeId: "classTypeId123"
  ) {
    success
    totalAssignedStudents
    roomAssignments
  }
}
```

## Queries

### Get Unassigned Students

```graphql
query {
  getUnassignedStudents(classTypeId: "classTypeId123") {
    id
    studentId
    mandatNumber
    student {
      name
      email
      class
    }
  }
}
```

### Get Students in a Room

```graphql
query {
  getStudentsInRoom(roomId: "roomId123") {
    id
    studentId
    mandatNumber
    student {
      name
      email
      class
    }
  }
}
```

## Key Features

1. **Random Assignment**: Students are shuffled randomly using Fisher-Yates algorithm
2. **Capacity Management**: Respects `maxStudents` limit for each room
3. **No Duplicates**: Students can only be assigned to one room per classType
4. **Automatic Updates**: Updates both StudentAnswer and ClassRoom records
5. **Error Handling**: Graceful handling of edge cases

## Assignment Logic

1. Find all StudentAnswer records for the classType without room assignment
2. Shuffle the array randomly
3. Take the first N students (where N = maxStudents)
4. Update StudentAnswer records with room number
5. Add mandat numbers to ClassRoom record

## Example Flow

1. Student registers for olympiad → StudentAnswer created with mandat number
2. Host creates classroom with classTypeId → Students automatically assigned
3. Student submits answers → Existing StudentAnswer updated with answers
4. Room assignment remains intact throughout the process
