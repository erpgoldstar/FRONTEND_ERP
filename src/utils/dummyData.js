const moment = require("moment");

module.exports = Object.freeze({
  CALENDAR_INITIAL_EVENTS: [
    {
      title: "Product call",
      theme: "GREEN",
      startTime: moment().add(-12, "d").startOf("day"),
      endTime: moment().add(-12, "d").endOf("day"),
    },
    {
      title: "Meeting with tech team",
      theme: "PINK",
      startTime: moment().add(-8, "d").startOf("day"),
      endTime: moment().add(-8, "d").endOf("day"),
    },
    {
      title: "Meeting with Cristina",
      theme: "PURPLE",
      startTime: moment().add(-2, "d").startOf("day"),
      endTime: moment().add(-2, "d").endOf("day"),
    },
    {
      title: "Meeting with Alex",
      theme: "BLUE",
      startTime: moment().startOf("day"),
      endTime: moment().endOf("day"),
    },
    {
      title: "Product Call",
      theme: "GREEN",
      startTime: moment().startOf("day"),
      endTime: moment().endOf("day"),
    },
    {
      title: "Client Meeting",
      theme: "PURPLE",
      startTime: moment().startOf("day"),
      endTime: moment().endOf("day"),
    },
    {
      title: "Client Meeting",
      theme: "ORANGE",
      startTime: moment().add(3, "d").startOf("day"),
      endTime: moment().add(3, "d").endOf("day"),
    },
    {
      title: "Product meeting",
      theme: "PINK",
      startTime: moment().add(5, "d").startOf("day"),
      endTime: moment().add(5, "d").endOf("day"),
    },
    {
      title: "Sales Meeting",
      theme: "GREEN",
      startTime: moment().add(8, "d").startOf("day"),
      endTime: moment().add(8, "d").endOf("day"),
    },
    {
      title: "Product Meeting",
      theme: "ORANGE",
      startTime: moment().add(8, "d").startOf("day"),
      endTime: moment().add(8, "d").endOf("day"),
    },
    {
      title: "Marketing Meeting",
      theme: "PINK",
      startTime: moment().add(8, "d").startOf("day"),
      endTime: moment().add(8, "d").endOf("day"),
    },
    {
      title: "Client Meeting",
      theme: "GREEN",
      startTime: moment().add(8, "d").startOf("day"),
      endTime: moment().add(8, "d").endOf("day"),
    },
    {
      title: "Sales meeting",
      theme: "BLUE",
      startTime: moment().add(12, "d").startOf("day"),
      endTime: moment().add(12, "d").endOf("day"),
    },
    {
      title: "Client meeting",
      theme: "PURPLE",
      startTime: moment().add(16, "d").startOf("day"),
      endTime: moment().add(16, "d").endOf("day"),
    },
  ],

  CURRENT_EMPLOYEES: [
    {
      id: 1,
      name: "Alex",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      date: moment().endOf("day"),
    },
    {
      id: 2,
      name: "Ereena",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      salary: 1500,
      date: moment().add(-1, "d").endOf("day"),
    },
    {
      id: 3,
      name: "John",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      date: moment().add(-1, "d").endOf("day"),
    },
    {
      id: 4,
      name: "Matrix",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
      salary: 1500,
      date: moment().add(-1, "d").endOf("day"),
    },
    {
      id: 5,
      name: "Virat",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/5-image.jpg",
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 6,
      name: "Miya",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/6-image.jpg",
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 7,
      name: "Virat",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      salary: 1500,
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 8,
      name: "Matrix",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 9,
      name: "Ereena",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 10,
      name: "John",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      salary: 1500,
      date: moment().add(-2, "d").endOf("day"),
    },
    {
      id: 11,
      name: "Virat",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      salary: 1500,
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 12,
      name: "Matrix",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/4-image.jpg",

      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 13,
      name: "Ereena",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/6-image.jpg",
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 14,
      name: "John",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      salary: 1500,
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 15,
      name: "Virat",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 16,
      name: "Miya",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
      salary: 1500,
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 17,
      name: "Matrix",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      salary: 1500,
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 18,
      name: "Virat",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      date: moment().add(-3, "d").endOf("day"),
    },
    {
      id: 19,
      name: "Ereena",
      salary: 1500,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      date: moment().add(-3, "d").endOf("day"),
    },
  ],

  AVAILABLE_CATEGORIES: [
    {
      name: "Tea",
      img: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    },
    {
      name: "Coconut",
      img: "https://images.unsplash.com/photo-1624843994317-541c71718272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvY29udXQlMjB0cmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Cinemon",
      img: "https://images.unsplash.com/photo-1530991472021-ce0e43475f6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ],
});


