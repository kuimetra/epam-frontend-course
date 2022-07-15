const BirthdayService = require('../src/birthday.service');

describe('BirthdayService', () => {
    const millisecondsInThirtyDays = 2592000000;
    const bs = new BirthdayService();

    beforeEach(() => {
        spyOn(bs, 'log');
    });

    it('should throw error in case of wrong argument', async () => {
        await expectAsync(bs.howLongToMyBirthday(2022)).toBeRejectedWith(new Error('Wrong argument!'));
    });

    it('should log proper message if it is birthday', async () => {
        await bs.howLongToMyBirthday(new Date()).then();
        expect(bs.log).toHaveBeenCalledWith('Hooray!!! It is today!');
    });

    it('should log proper message if birthday will be in the next half year', async () => {
        await bs.howLongToMyBirthday(new Date(Date.now() + millisecondsInThirtyDays)).then();
        expect(bs.log).toHaveBeenCalledWith('Soon...Please, wait just 30 day/days');
    });

    it('should log proper message if birthday has already happened less than 6 month ago', async () => {
        await bs.howLongToMyBirthday(new Date(Date.now() - millisecondsInThirtyDays)).then();
        expect(bs.log).toHaveBeenCalledWith("Oh, you have celebrated it 30 day/s ago, don't you remember?");
    });
});
