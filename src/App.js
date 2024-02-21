import React, { useState, useRef } from "react";
const App = () => {
  const modules = [
    { id: 1, name: "Item 1", img: require("./Assets/001.png") },
    { id: 2, name: "Item 2", img: require("./Assets/002.png") },
    { id: 3, name: "Item 3", img: require("./Assets/003.png") },
    { id: 4, name: "Item 4", img: require("./Assets/004.png") },
    { id: 5, name: "Item 5", img: require("./Assets/005.png") },
    { id: 6, name: "Item 6", img: require("./Assets/006.png") },
    { id: 7, name: "Item 7", img: require("./Assets/007.png") },
    { id: 8, name: "Item 8", img: require("./Assets/008.png") },
  ];
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(modules);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <>
      <div
        className="module"
        style={{
          textAlign: "center",
          fontSize: "40px",
        }}
        onDragStart={(e) => dragStart(e, 0)}
        onDragEnter={(e) => dragEnter(e, 0)}
        onDragEnd={drop}
        key={modules[0].id}
        draggable
      >
        <img
          src={modules[0].img}
          alt={modules[0].name}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "5px",
        }}
      >
        {list.slice(1, -1).map((item, index) => (
          <div
            className="module"
            style={{
              justifyContent: "space-between",
              display: "inline-block",
              textAlign: "center",
              fontSize: "40px",
            }}
            onDragStart={(e) => dragStart(e, index + 1)}
            onDragEnter={(e) => dragEnter(e, index + 1)}
            onDragEnd={drop}
            key={item.id}
            draggable
          >
            <img
              src={item.img}
              alt={item.name}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <div
        className="module"
        style={{
          textAlign: "center",
          fontSize: "40px",
        }}
        onDragStart={(e) => dragStart(e, modules.length - 1)}
        onDragEnter={(e) => dragEnter(e, modules.length - 1)}
        onDragEnd={drop}
        key={modules[modules.length - 1].id}
        draggable
      >
        <img
          src={modules[modules.length - 1].img}
          alt={modules[modules.length - 1].img}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </>
  );
};
export default App;
