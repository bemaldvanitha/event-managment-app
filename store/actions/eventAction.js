import axios from 'axios';
import * as firebase from 'firebase';

import Events from '../../models/events';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';

export const fetchPosts = () => {
  return (dispatch) => {
      console.log(firebase.auth().currentUser.uid);
      axios.get('https://event-management-1c0bb.firebaseio.com/events.json').then(res => {
          const resData = res.data;
          const loadedEvents = [];
          for(const key in resData){
              loadedEvents.push(new Events(key,resData[key].name,resData[key].description,resData[key].imageUrl,resData[key].place,resData[key].date,resData[key].price,resData[key].uId,resData[key].email));
          }
          dispatch({
              type: FETCH_EVENTS,
              payload: {
                  loadedEvents: loadedEvents,
                  uId: firebase.auth().currentUser.uid
              }
          })
      })
  }
};

export const addFavorite = (id) => {
    return{
        type: ADD_FAVORITE,
        payload: id,
    }
};

export const addEvent = (name,description,imageUrl,place,price,email,date) => {
  return (dispatch) => {
      firebase.auth().currentUser.getIdTokenResult(true).then(data => {
          axios.post(`https://event-management-1c0bb.firebaseio.com/events.json?auth=${data.token}`,{
              name,
              description,
              imageUrl,
              place,
              price,
              email,
              date,
              uId: firebase.auth().currentUser.uid
          }).then(res => {
              const resData = res.data;
              console.log(resData);
              dispatch({
                  type: ADD_EVENT,
                  payload: {
                      id: resData.name,
                      name: name,
                      description: description,
                      imageUrl: imageUrl,
                      place: place,
                      price: price,
                      email: email,
                      date: date,
                      uId: firebase.auth().currentUser.uid
                  }
              })
          });
      }).catch(err => {
          console.log(err);
      });
  }
};

export const deleteEvent = (id) => {
    return dispatch => {
        firebase.auth().currentUser.getIdTokenResult(true).then(data => {
            axios.delete(`https://event-management-1c0bb.firebaseio.com/events/${id}.json?auth=${data.token}`).then(res => {
                dispatch({
                    type: DELETE_EVENT,
                    payload: id
                });
            });
        }).catch(err => {
            console.log(err);
        });


    }
};

export const updateEvent = (id,name,description,imageUrl,place,price,email,date) => {
    return dispatch => {
        firebase.auth().currentUser.getIdTokenResult(true).then(data => {
            axios.patch(`https://event-management-1c0bb.firebaseio.com/events/${id}.json?auth=${data.token}`,{
                name,
                description,
                imageUrl,
                place,
                price,
                email,
                date
            }).then(res => {
                dispatch({
                    type: UPDATE_EVENT,
                    payload: {
                        id: id,
                        name: name,
                        description: description,
                        imageUrl: imageUrl,
                        place: place,
                        price: price,
                        email: email,
                        date: date,
                        uId: firebase.auth().currentUser.uid
                    }
                });
            });
        }).catch(err => {
            console.log(err);
        });
    }
};