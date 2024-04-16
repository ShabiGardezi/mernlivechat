<<<<<<< HEAD
 import { createContext, useState, useEffect, useContext } from "react";
=======
import { createContext, useState, useEffect, useContext } from "react";
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import { userContext } from "../context/userState";
import { chatContext } from "../context/chatsState";
export const messegeContext = createContext();

export const MessegeState = (props) => {
  const context = useContext(userContext);
  const [messages, setmessages] = useState([]);
  const {
    chats,
    updateChats,
    socket,
    selectedChat,
    onlineUsers,
    setonlineUsers,
  } = useContext(chatContext);
  const [typing, settyping] = useState(false);
  const [typingchats, settypingchats] = useState([]);
  // const [showloading, setshowloading] = useState(true)
  const _setmessages = (msgArr) => {
    setmessages(msgArr);
  };

  useEffect(() => {
    if (socket) {
      socket.on("message received", (msg) => {
        // console.log(msg)
        settyping(false);
        if (selectedChat !== msg.chat._id) {
          // handle notifications
          let index = chats.findIndex((e) => {
            return e._id === msg.chat._id;
          });

          if (index !== -1) {
            // console.log(msg);
            const newState = chats.map((element) => {
              if (element._id === msg.chat._id) {
                const counter = element.unReadmessages + 1;
                return {
                  ...element,
                  unReadmessages: counter,
                  latestMessage: {
                    messege: msg.messege,
                    createdAt: msg.createdAt,
                  },
                };
              }

              return element;
            });
            updateChats(newState);
          } else {
            // console.log(msg);
            let newUsers = () => {
              let newarr = msg.chat.users.filter((user) => {
                return user._id !== context.user._id;
              }); // make deep

              return newarr;
            };
            let newchat = {
              _id: msg.chat._id,
              latestMessage: { messege: msg.messege, createdAt: msg.createdAt },
              users: newUsers(),
              chatName: msg.chat.chatName,
              isGroupChat: msg.chat.isGroupChat,
              groupAdmin: msg.chat.groupAdmin
                ? msg.chat.groupAdmin._id
                : "Default",
              unReadmessages: 1,
            };
            // console.log(newchat)
            // if(!newchat.isGroupChat)
            // setonlineUsers([...onlineUsers,newchat.users[0]._id])

            updateChats([...chats, newchat]);
          }
        } else {
          _setmessages([...messages, msg]);
          const newState = chats.map((element) => {
            if (element._id === msg.chat._id) {
              const counter = element.unReadmessages + 1;
              return {
                ...element,
                latestMessage: {
                  messege: msg.messege,
                  createdAt: msg.createdAt,
                },
              };
            }

            return element;
          });
          // console.log(newState);
          updateChats(newState);
        }
      });
    }

    return () => {
      if (socket) socket.off("message received");
    };
  });

  return (
    <messegeContext.Provider
      value={{
        messages,
        _setmessages,
        typing,
        settyping,
        typingchats,
        settypingchats,
      }}
    >
      {props.children}
    </messegeContext.Provider>
  );
};
