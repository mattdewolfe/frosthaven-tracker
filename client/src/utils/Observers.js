import ObserverPattern from "./ObserverPattern";

const Subs = Object.freeze({
    REQUEST_TOAST_MESSAGE: "request_toast_message"
});

const globalObserver = new ObserverPattern();

export { globalObserver, Subs };