const ProjectsData = [
  {
    id: "personal-website",
    name: "Personal Website",
    stack: ["< React.js />", "< CSS3 />","< HTML5 />", "< Typescript />"],
    source: "https://github.com/GarrettSidle/Personal-Website",
    date:"June 2022 - Present",
    demo:"/Home",
    imgPath:"/Personal-Website.png",
    secondayImgPath:"",
    description:
      "This project is the website you are currently on, built using the React framework. The website was designed from scratch utilizing the React-Bootstrap library. The website serves as an online portfolio and personal branding platform for me, showcasing my skills, experiences, and other projects. It was later deployed through Amazon Web Services. I believe this project showcases my design skills through the visually appealing layout and user-friendly navigation of the website, and also highlights my ability to effectively utilize cloud-based hosting solutions.",
  },
  // {
  //   id: "crud-web-application",
  //   name: "CRUD Web Application",
  //   stack: ["< RESTful API />", "< CSS3 />", "< React.js />", "< Nest.js />", , "< Typescript />", "< MySQL />"],
  //   source: "",
  //   date:"December 2022",
  //   demo:"",
  //   imgPath:"",
  //   secondayImgPath:"",
  //   description:
  //     "This project is a CRUD (Create, Read, Update, and Delete) web application that allows users to interact with a database through a front-end interface. The backend of the application is built using the Nest.js framework, which is a powerful and flexible JavaScript framework for building efficient and scalable server-side applications. The database used in this project is MySQL, a popular open-source relational database management system. The application allows users to create new records, view existing records, update existing records, and delete records from the database. The communication between the front-end and the backend is done through RESTful API calls, which allow the webpage to securely and efficiently access the database and make the necessary changes. REST(Representational State Transfer) is a standard architectural style for building web services, these API calls are based on the REST principles and can be easily consumed by any web-based client.",
  // },
  {
    id: "rc-car",
    name: "Remote-Control Car",
    stack: ["< C++ />", "< Electronic Design />", "< Ardiuno Programming />"],
    source: "https://github.com/GarrettSidle/RC-Car",
    date:"October 2022",
    demo:"",
    imgPath:"/RC-Car1.png",
    secondayImgPath:"/RC-Car2.png",
    description:
      "This project involves the construction of a remote-controlled car using an Arduino microcontroller and DC motors. The car is controlled via a wireless communication module, allowing for remote operation. C++ programming language is used to write the code for the Arduino, which is responsible for controlling the motors and receiving commands from the remote controller. The car's speed and direction can be adjusted using the remote, and it also includes features such as obstacle detection and automatic braking. The project demonstrates the integration of hardware and software to create a functional and user-friendly device.",
  }
];

export { ProjectsData };