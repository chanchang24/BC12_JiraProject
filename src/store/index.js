import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import movieReducer from 'containers/client/Home/module/reducer'
import movieDetailReducer from 'containers/client/MovieDetail/module/reuducerDetail';
import authReducer from 'containers/share/Auth/module/reducer'
import thunk from 'redux-thunk';



const rootReducer = combineReducers({
    movieReducer,
    movieDetailReducer,
    authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer']
    //chỉ muốn lưu authReducer
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const middleware =[thunk,sage]; trường hợp có nhiều middleware

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
const persistor = persistStore(store)
export {store,persistor};

//logout 2t27