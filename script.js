'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    // start: {
    //     receive: (bot) => {
    //         return bot.say('Hi! I\'m Smooch Bot!')
    //             .then(() => 'askName');
    //     }
    // },
    
    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch Bot! Continue? %[Yes](postback:askName) %[No](postback:bye)')
                        .then(() => 'processing');
        }
    },
    bye: {
        prompt: (bot) => bot.say('Postback is working'),
        receive: () => 'processing'
    },

    askName: {
        prompt: (bot) => bot.say('Postback is working. What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:bye) %[No](postback:bye)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
