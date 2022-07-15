const TIMER_DELAY = 60000, NUMBER_OF_ARTICLES_TO_APPROVE = 5;
const isEditor = (role) => ['sport', 'info', 'politics', 'general'].includes(role.toString().toLowerCase());

class Magazine {
    constructor() {
        this.states = [
            new ReadyForPushNotification(this),
            new ReadyForApprove(this),
            new ReadyForPublish(this),
            new PublishInProgress(this)
        ];
        this.currentState = this.states[0];
        this.staff = [];
        this.articles = [];
        this.followers = [];
    }

    addEmployee(employee) {
        this.staff.push(employee);
    }

    getArticlesAmount() {
        return this.articles.length;
    }

    changeState() {
        const totalStates = this.states.length;
        let currentIndex = this.states.findIndex((s) => s === this.currentState);
        if (currentIndex + 1 < totalStates) {
            this.currentState = this.states[currentIndex + 1];
        } else {
            this.currentState = this.states[0];
        }
    }

    subscribe(follower, topic) {
        this.followers.push({follower: follower, topic: topic});
    }

    unsubscribe(follower, topic) {
        this.followers = this.followers.filter((s) => s.follower !== follower || s.topic !== topic);
    }

    sendNotificationsToFollowers() {
        this.articles.forEach((a) => {
            this.followers.forEach((f) => {
                if (f.topic === a.topic) {
                    f.follower.onUpdate(a.article);
                }
            });
        });
    }
}

class MagazineState {
    constructor(magazine) {
        this.magazine = magazine;
    }
}

class ReadyForPushNotification extends MagazineState {
    addArticle(article, employee) {
        if (isEditor(employee.type)) {
            this.magazine.articles.push({topic: employee.type, article: article});
            if (this.magazine.getArticlesAmount() >= NUMBER_OF_ARTICLES_TO_APPROVE) {
                this.magazine.changeState();
            }
        } else {
            console.log('You do not have permissions to add articles.');
        }
    }

    publish(employee) {
        console.log(`Hello ${employee.name}. You can't publish. We are creating publications now.`);
    }

    approve(employee) {
        if (employee.type === 'manager') {
            console.log(`Hello ${employee.name}. You can't approve. We don't have enough of publications.`);
        } else {
            console.log('You do not have permissions to do it.');
        }
    }
}

class ReadyForApprove extends MagazineState {
    addArticle(article, employee) {
        if (isEditor(employee)) {
            this.magazine.articles.push({topic: employee.type, article: article});
        } else {
            console.log('You do not have permissions to add articles.');
        }
    }

    publish(employee) {
        console.log(`Hello ${employee.name}. You can't publish. We don't have a manager's approval.`);
    }

    approve(employee) {
        if (employee.type === 'manager') {
            console.log(`Hello ${employee.name}. You've approved the changes.`);
            this.magazine.changeState();
        } else {
            console.log('You do not have permissions to do it.');
        }
    }
}

class ReadyForPublish extends MagazineState {
    addArticle(article, employee) {
        console.log(`Hello ${employee.name}. You cannot add an article after the article list has been approved.`);
    }

    publish(employee) {
        console.log(`Hello ${employee.name}. You've recently published publications.`);
        this.magazine.changeState();
        this.magazine.sendNotificationsToFollowers();
        setTimeout(() => {
            this.magazine.changeState();
        }, TIMER_DELAY);
    }

    approve(employee) {
        console.log(`Hello ${employee.name}. Publications have been already approved by you.`);
    }
}

class PublishInProgress extends MagazineState {
    addArticle(article, employee) {
        console.log(`Hello ${employee.name}. While we are publishing we can't do any actions.`);
    }

    publish(employee) {
        console.log(`Hello ${employee.name}. While we are publishing we can't do any actions.`);
    }

    approve(employee) {
        console.log(`Hello ${employee.name}. While we are publishing we can't do any actions`);
    }
}

class MagazineEmployee {
    constructor(name, type, magazine) {
        this.name = name;
        this.type = type;
        this.magazine = magazine;
        this.magazine.addEmployee(this);
    }

    addArticle(article) {
        this.magazine.currentState.addArticle(article, this);
    }

    approve() {
        this.magazine.currentState.approve(this);
    }

    publish() {
        this.magazine.currentState.publish(this);
    }
}

class Follower {
    constructor(name) {
        this.name = name;
    }

    subscribeTo(magazine, topic) {
        magazine.subscribe(this, topic);
    }

    unsubscribeFrom(magazine, topic) {
        magazine.unsubscribe(this, topic);
    }

    onUpdate(data) {
        console.log(`${data} ${this.name}`);
    }
}
