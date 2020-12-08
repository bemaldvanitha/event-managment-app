import {FETCH_EVENTS,ADD_FAVORITE,ADD_EVENT,DELETE_EVENT,UPDATE_EVENT} from '../actions/eventAction';
//import events from '../../data/dummy_data';
import Events from '../../models/events';


const initialState ={
    events: [],
    favEvents: [],
    myEvents: [],
};

const eventReducer = (state = initialState,actions) => {
    switch (actions.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                events: actions.payload.loadedEvents,
                myEvents: actions.payload.loadedEvents.filter(eve => eve.uId === actions.payload.uId)
            };
        case ADD_FAVORITE:
            const exist = state.favEvents.findIndex(eve => eve.id === actions.payload);
            if( exist >= 0 ){
                const eventsList = state.favEvents.filter(eve => eve.id !== actions.payload);
                return {
                    ...state,
                    events: state.events,
                    favEvents: eventsList,
                }
            }else{
                const event = state.events.find(eve => eve.id === actions.payload);
                return {
                    ...state,
                    events: state.events,
                    favEvents: state.favEvents.concat(event),
                }
            }
        case ADD_EVENT:
            const event = new Events(
                actions.payload.id,
                actions.payload.name,
                actions.payload.description,
                actions.payload.imageUrl,
                actions.payload.place,
                actions.payload.date.toString(),
                actions.payload.price.toString(),
                actions.payload.uId,
                actions.payload.email
            );
            return {
                ...state,
                events: state.events.concat(event),
                myEvents: state.myEvents.concat(event)
            };
        case DELETE_EVENT:
            return {
              ...state,
              events: state.events.filter(eve => eve.id !== actions.payload),
              favEvents: state.favEvents.filter(eve => eve.id !== actions.payload),
                myEvents: state.myEvents.filter(eve => eve.id !== actions.payload),
            };
        case UPDATE_EVENT:
            const index = state.events.findIndex(eve => eve.id === actions.payload.id);
            const UserIndex = state.myEvents.findIndex(eve => eve.id === actions.payload.id);
            const updateEvent = new Events(
                actions.payload.id,
                actions.payload.name,
                actions.payload.description,
                actions.payload.imageUrl,
                actions.payload.place,
                actions.payload.date.toString(),
                actions.payload.price.toString(),
                actions.payload.uId,
                actions.payload.email
            );
            const updatedEvent = [...state.events];
            const updatedMyEvents = [...state.myEvents];
            updatedEvent[index] = updateEvent;
            updatedMyEvents[UserIndex] = updateEvent;
            return {
              ...state,
              events: updatedEvent,
              myEvents: updatedMyEvents
            };
            default:
            return state;
    }
};

export default eventReducer;