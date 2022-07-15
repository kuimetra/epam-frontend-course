const timeOut = 100;

class BirthdayService {
    howLongToMyBirthday(date) {
        return new Promise((resolve, reject) => {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                reject(new Error('Wrong argument!'));
            }
            setTimeout(() => {
                const millisecondsInSixMonth = 15768000000;
                const now = new Date();
                const birthday = new Date(date);
                if (birthday.getDate() === now.getDate() && birthday.getMonth() === now.getMonth()) {
                    this.log(this.congratulateWithBirthday());
                    resolve(this.congratulateWithBirthday());
                } else {
                    const diff = birthday - now;
                    if (Math.abs(diff) < millisecondsInSixMonth) {
                        this.log(this.notifyWaitingTime(diff));
                        resolve(this.notifyWaitingTime(diff));
                    }
                }
            }, timeOut);
        });
    }

    congratulateWithBirthday() {
        return 'Hooray!!! It is today!';
    }

    notifyWaitingTime(time) {
        const millisecondsInDay = 86400000;
        const days = Math.ceil(time / millisecondsInDay);
        return time > 0 ? `Soon...Please, wait just ${days} day/days`
            : `Oh, you have celebrated it ${Math.abs(days)} day/s ago, don't you remember?`;
    }

    log(msg) {
        console.log(msg);
    }
}

module.exports = BirthdayService;
