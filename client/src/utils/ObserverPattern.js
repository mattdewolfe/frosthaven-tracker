import UUID from './UUID';

class Subscription {
    constructor(key, listener, observer, subscribeOnce) {
        this.id = UUID();

        this.call = (data = null, ...args) => {
            if (listener !== 'undefined') {
                listener(data, ...args);
            }

            if (subscribeOnce === true) {
                this.remove();
            }
        };

        this.remove = () => {
            observer.unsubscribe(key, this);
        };
    }
}


class ObserverPattern {
    constructor() {
        this.subscriptions = new Map();
    }

    subscribe = (key, listener, subscribeOnce = false) => {
        if (key === undefined) {
            console.log(`Subscribing with undefined key [${key}]`);
            return null;
        }

        let subscriber = new Subscription(key, listener, this, subscribeOnce);

        let subscribers = [];
        if (this.subscriptions.has(key) === true) {
            subscribers = this.subscriptions.get(key);
        }

        this.subscriptions.set(key, [...subscribers, subscriber]);

        return subscriber;
    };

    sendMsg = (key, data = null, ...args) => {
        if (this.subscriptions.has(key) === true) {
            this.subscriptions.get(key).forEach((value) => {
                value.call(data, ...args);
            });
        }
    };

    unsubscribe = (key, subscription) => {
        if (this.subscriptions.has(key) === true) {
            let subscribers = this.subscriptions.get(key);

            let updatedSubscribers = subscribers.filter((sub) => {
                return sub.id !== subscription.id;
            });

            this.subscriptions.set(key, updatedSubscribers);

            // If the last listener was removed then delete the subscription key
            if (updatedSubscribers.length === 0)
                this.subscriptions.delete(key);
        }
    };

    unsubscribeKey = (key) => {
        this.subscriptions.delete(key);
    };

    unsubscribeAll = () => {
        this.subscriptions.clear();
    };

    printSubscribers = () => {
        console.log('--- Current Subscribers --------');
        this.subscriptions.forEach((value, key) => {
            console.log(`    [${key}] subscriber count=${value.length.toString()}`);
        });
        console.log('--------------------------------');
    }
}

export default ObserverPattern;