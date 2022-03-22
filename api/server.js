// モジュールの読み込み
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport, getVoiceConnection } = require("@discordjs/voice");
const {  } = require('tweetnacl')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const schedule = require("node-schedule");
const fs = require('fs');
const Config = require('./config').Config;
const config = new Config('config/clip.json');
const user_config = new Config('config/user.json');
const storelist = new Config('config/store/list.json');
const joblist = new Config('config/job.json');

let interval;

bytes = function (text) {
  return(encodeURIComponent(text).replace(/%../g,"x").length);
}

client.on('ready', () => {
  // const hello = {
	// 	name: 'hello',
	// 	description: '🤔'
	// };
  // const have = {
	// 	name: 'have',
	// 	description: 'CliPointを確認する'
	// };

	// client.application.commands.create(hello, '938211058517151754');
  // client.application.commands.create(have, '938211058517151754');
  console.log(`${client.user.tag} でログインしています。`);
  ready();
});

var react = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];
var react_1 = ["🎵", "📼", "📧", "❌"];

var zip_rss;
var news;
var news_url;

// OSを定義
var android_sp = ['XperiaXZ1','GalaxyA20'];
var ios_sp = ['iPhone13','iPhone13Pro'];
var ios_tb = ['iPad8','iPadAir4']

const RssParser = require('rss-parser');
const rssParser = new RssParser();
const rssParser2 = new RssParser();

setInterval(() => {
  rssParser.parseURL('https://nitter.net/ZIP_Muryobochi/rss')
  .then((feed) => {
    // console.log('RSS 取得成功', feed.items[0].contentSnippet);
    zip_rss = feed.items[0].contentSnippet;
  })
  .catch((error) => {
    console.error('RSS 取得失敗', error);
  });
}, 10000);

setInterval(() => {
  rssParser2.parseURL('https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf')
  .then((feed) => {
    // console.log('RSS 取得成功', feed.items[0].title);
    news = feed.items[0].title;
    news_url = feed.items[0].link;
  })
  .catch((error) => {
    console.error('RSS 取得失敗', error);
  });
}, 10000);

var rnd2;
setInterval(() => {
  rnd2 = Math.floor( Math.random() * ( 2000 - 1500 ) + 1500 );
}, 10000);

var ready = () => {
  setInterval(async () => {
    var msgs = ['縺ｩ縺?↑繧九°縲√ｏ縺九▲縺ｦ繧九?縺九↑弌?','你知道会发生什么吗😟？','Do you know what will happen 😟?','어떻게 될지, 알고 있을까 😟?','Знаешь что будет 😟?'];
    var rnd = Math.floor( Math.random() * ( 1000 - 100 ) + 100 );
    rnd2 = Math.floor( Math.random() * ( 4 - 0 ) + 0 );
  
    if(client.guilds.cache.get('943753402624639016') === null){
      console.log('😟');
    }
    else{
      var reply = await client.guilds.cache.get('943753402624639016').channels.cache.get('944507157158707221').send(msgs[rnd2]);
    
      setTimeout(async ()=>{
        await reply.delete();
      }, rnd);
    }
  }, rnd2);
};

client.on("messageCreate", msg => {
  if(msg.author.bot) return;

  if(msg.guild.id === '943753402624639016'){
    //
  }
  if(msg.guild.id === '938211058517151754'){
    // メンバーになるコマンド
    if(msg.content === '.hello'){
      var roleId = "938211897004679209";
      msg.member.roles.add(`${roleId}`);
      msg.reply({
          embeds: [{
              description: `Granted the role <@&${roleId}>`,
              color: "RANDOM"
          }]
      });

      config.set(msg.author.id, config.get(msg.author.id) + 100);
    }

    // ボイスチャンネル
    if(msg.content === '.join'){
      try{
        connection = joinVoiceChannel({
          channelId: msg.member.voice.channel.id,
          guildId: msg.guild.id,
          adapterCreator: msg.guild.voiceAdapterCreator
        });
        let resource = createAudioResource('music/&.mp3', {
          inputType: StreamType.Arbitrary,
        });
        if(msg.guild.me.voice.channel?.type == 'GUILD_STAGE_VOICE'){
          msg.guild.me.voice.setRequestToSpeak(true);
        }
        const player = createAudioPlayer();
        connection.subscribe(player);
        player.play(resource);   
      }
      catch(e){
        console.log(e)
      }
    }

    if(msg.content === '.leave'){
      const connection = getVoiceConnection(msg.guild.id)

      if(!connection) return msg.channel.send("I'm not in a voice channel!")

      connection.destroy()

      console.log('Disconnected from voice!');
    }

    // 窓の杜のニュースを取得するコマンド
    if(msg.content === '.news'){
      msg.channel.send({
        "embeds": [{
          "title": `${news} - 現在の窓の杜のニュース`,
          "description": `RSS : https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf
          `,
          "url": `${news_url}`,
          "color": "RANDOM",
          "footer": {
            "text": "LiquidClii V2"
          }
        }]
      });
    }

    // if(msg.content === '.getcoin'){
    //   config.set(msg.author.username, config.get(msg.author.username) + 10);
    //   msg.channel.send({
    //     "embed": {
    //       "title": `${msg.author.username}さんがコインを獲得しました。`,
    //       "description": `あなたの持っている金額 : ${config.get(msg.author.username)} CliPoint`,
    //       "color": "RANDOM",
    //       "footer": {
    //         "text": "LiquidClii V2"
    //       }
    //     }
    //   });
    // }

    // ポイントを確認するコマンド
    if(msg.content.slice(0, 5) === '.have'){
      var arg = msg.content.split(' ');
      if(config.get(arg[1]) === null){
        msg.channel.send('Userが存在しません！');
      }
      else if(config.get(arg[1]) === undefined){
        msg.channel.send({
          "embeds": [{
            "title": `${msg.author.username}さんの持っている金額。`,
            "description": `${config.get(msg.author.id)} CliPoint`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });
      }
      else{
        msg.channel.send({
          "embeds": [{
            "title": `${arg[1]}さんの持っている金額。`,
            "description": `${config.get(arg[1])} CliPoint`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });
      }
    }

    // 優先者になるコマンド
    if(msg.content === '.priority'){
      if(config.get(msg.author.id) > 500) {
        config.set(msg.author.id, config.get(msg.author.id) - 500);
        config.set('LiquidClii', config.get('LiquidClii') - 500);
        msg.channel.send({
          "embeds": [{
            "title": `${msg.author.username}さんがPrioriterになりました。`,
            "description": `5分間優先スピーカーになります。\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });

        var roleId = "942279039937298443";
        msg.member.roles.add(`${roleId}`);

        setTimeout(() => {
          msg.member.roles.remove(`${roleId}`);
          msg.channel.send({
            "embeds": [{
              "title": `${msg.author.username}さん、Prioriterを解除しました。`,
              "description": `あなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
              "color": "RANDOM",
              "footer": {
                "text": "LiquidClii V2"
              }
            }]
          });
        }, 300000);
      }
      else {
        msg.channel.send({
          "embeds": [{
            "title": `${msg.author.username}さん、コインが足りません！`,
            "description": `必要な金額 : 100 CliPoint\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });
      }
    }

    // 全員デフォルトの設定に変更
    if(msg.content == '.set_config all') {
      if(msg.author.id === '866083131433943050'){
        client.guilds.cache.get('938211058517151754').members.fetch()
        .then(members => Promise.all(members.map(member => 
          user_config.set(member.user.id, {
            "name": member.user.username,
            "obj": []
          }))
        ));
        msg.channel.send({
          "embeds": [{
            "title": `全員にデフォルトのUserConfigを適用しました`,
            "description": `${msg.createdAt}`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });
      }
    }

    // CliPointを全員初期化
    if(msg.content == '.set_config clip all') {
      if(msg.author.id === '866083131433943050'){
        client.guilds.cache.get('938211058517151754').members.fetch()
        .then(members => Promise.all(members.map(member => 
          config.set(member.user.id, 100000))
        ));
        msg.channel.send({
          "embeds": [{
            "title": `全員にデフォルトのCliPConfigを適用しました`,
            "description": `${msg.createdAt}`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });
      }
    }

    // ユーザーネーム変更
    if(msg.content.slice(0, 16) === '.set_config name'){
      var arg = msg.content.split(' ');
      console.log(arg[2]);
      if(arg[2] == null || undefined){
        msg.channel.send('Argが足りません！');
      }
      else {
        user_config.set(msg.author.id, {
          name: msg.author.username
        });

        msg.channel.send('ユーザーネームを変更しました！');
      }
    }
    if(msg.content === '.own'){
      var user_config_file = user_config.get(msg.author.id);
        
      var obj = user_config_file['obj'];

      msg.channel.send({
        "embeds": [{
          "title": `${msg.author.username}さんの所持品`,
          "description": `${obj}`,
          "color": "RANDOM",
          "footer": {
            "text": "LiquidClii V2"
          }
        }]
      });
    }

    // スマホを立ち上げる
    // AndroidかiPhoneかは23業目のvarで決めている
    if(msg.content.slice(0, 3) === '.sp'){
      var arg = msg.content.split(' ');
      var user_config_file = user_config.get(msg.author.id);
      var obj = user_config_file['obj'];
      async function a () {
        // msg.channel.send('所持品を選択してください！');
        var act = await msg.channel.send({
          "embeds": [{
            "title": `${msg.author.username}さん、どのスマホを立ち上げますか？`,
            "description": `${obj}\n※(所持品の左から立ち上げたいスマホの番号をリアクションしてください。)`,
            "color": "RANDOM",
            "footer": {
              "text": "LiquidClii V2"
            }
          }]
        });

        react.slice(0, obj.length).forEach((emoji) => act.react(emoji));
        joblist.set('reaction_job', [act.id, obj.length, 'sp_boot']);
      }
      a ();
      console.log('🤔')
    }

    // 商品を買う
    // config/store/list.jsonから商品を編集できる
    if(msg.content.slice(0, 4) === '.buy'){
      var arg = msg.content.split(' ');
      
      if(arg[1] == null){
        msg.channel.send('Argが足りません！');
      }
      else{
        if(arg[2] == null){
          msg.channel.send('Argが足りません！');
        }
        else{
          if(storelist.get(arg[1]) == null){
            msg.channel.send('ストアが存在しません！');
          }
          else{
            var store = storelist.get(arg[1]);
            var user_config_file = user_config.get(msg.author.id);
            if(store[arg[2] == null] || store[arg[2]] == undefined){
              msg.channel.send('商品が存在しません！');
            }
            else{
              if(user_config_file['obj'] === null){
                user_config_file['obj'] === [];
                user_config.set(msg.author.id, {
                  name: user_config_file['name'],
                  obj: user_config_file['obj']
                });
              }
              else if(user_config_file['obj'] === undefined){
                user_config_file['obj'] === [];
                user_config.set(msg.author.id, {
                  name: user_config_file['name'],
                  obj: user_config_file['obj']
                });
              }
              else{
                var price = store[arg[2]]['price'];
              
                var obj = user_config_file['obj'];
                obj[obj.length] = arg[2];
                user_config.set(msg.author.id, {
                  name: user_config_file['name'],
                  obj: obj
                });
                console.log(store['owner']);
                console.log(config.get(store['owner']));
                if(config.get(store['owner'] == null || store['owner'] == null)){
                  msg.channel.send('店のオーナーが見つからないため購入することができません！');
                }
                else{
                  if(config.get(msg.author.id) > price){
                    config.set(msg.author.id, config.get(msg.author.id) - price);
                    config.set(store['owner'], config.get(store['owner']) + price);
                    msg.channel.send({
                      "embeds": [{
                        "title": `${msg.author.id}さんが${arg[2]}を購入しました。`,
                        "description": `価格 : ${price}\n${msg.createdAt}`,
                        "color": "RANDOM",
                        "footer": {
                          "text": "LiquidClii V2"
                        }
                      }]
                    });
                  }
                  else{
                    msg.channel.send({
                      "embeds": [{
                        "title": `${msg.author.username}さん、コインが足りません！`,
                        "description": `必要な金額 : ${price} CliPoint\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
                        "color": "RANDOM",
                        "footer": {
                          "text": "LiquidClii V2"
                        }
                      }]
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    // お金を送る
    if(msg.content.slice(0, 5) === '.gift'){
      var arg = msg.content.split(' ');

      var gift = Number(arg[2]);
      if(msg.mentions.users.array()[0].id == null || undefined){
        msg.channel.send('Argが足りません！');
      }
      else{
        if(arg[2] == null || undefined){
          msg.channel.send('Argが足りません！');
        }
        else{
          try{
            if(config.get(msg.mentions.users.array()[0].id) == null || undefined){
              msg.channel.send('Userが存在しません！');
            }
            else{
              if(gift < config.get(msg.author.id)) {
                if(gift > 0){
                  if(gift < 10000){
                    config.set(msg.mentions.users.array()[0].id, config.get(msg.mentions.users.array()[0].id) + gift);
                    config.set(msg.author.id, config.get(msg.author.id) - gift);
                    msg.channel.send({
                      "embeds": [{
                        "title": `${msg.author.username}さんが${msg.mentions.users.array()[0].username}さんに${gift} CliPoint送りました。`,
                        "description": `${msg.createdAt}`,
                        "color": "RANDOM",
                        "footer": {
                          "text": "LiquidClii V2"
                        }
                      }]
                    });
                  }
                  else {
                    msg.channel.send('10000 CliPoint以上のギフトは複数回に分けてご利用ください。')
                  }
                }
              }

              else {
                msg.channel.send({
                  "embeds": [{
                    "title": `${msg.author.username}さん、コインが足りません！`,
                    "description": `必要な金額 : ${gift} CliPoint\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
                    "color": "RANDOM",
                    "footer": {
                      "text": "LiquidClii V2"
                    }
                  }]
                });
              }
            }
          }
          catch(e){
            msg.channel.send('エラー');
          }
        }
      }
    }

    // アップグレード
    // Pro、Ultraはどちらも1000 CliPoint
    if(msg.content === '.upgrade'){
      try {
        if(config.get(msg.author.id) > 1000) {
          if(!msg.member.roles.cache.has('941930948281397269')){
            msg.channel.send({
              "embeds": [{
                "title": `${msg.author.id}さんがProにアップグレードしました。`,
                "description": `${msg.createdAt}`,
                "color": "RANDOM",
                "footer": {
                  "text": "LiquidClii V2"
                }
              }]
            });
            var roleId = "941930948281397269";
            msg.member.roles.add(`${roleId}`);

            config.set(msg.author.id, config.get(msg.author.id) - 1000);
            config.set('LiquidClii', config.get('LiquidClii') + 1000);
          }
          else {
            if(config.get(msg.author.id) > 1000) {
              if(!msg.member.roles.cache.has('942243177975410698')){
                msg.channel.send({
                  "embeds": [{
                    "title": `${msg.author.username}さんがUltraにアップグレードしました。`,
                    "description": `${msg.createdAt}\nあなたの持っている金額`,
                    "color": "RANDOM",
                    "footer": {
                      "text": "LiquidClii V2"
                    }
                  }]
                });

                var roleId = "942243177975410698";
                msg.member.roles.add(`${roleId}`);
        
                config.set(msg.author.id, config.get(msg.author.id) - 1000);
                config.set('LiquidClii', config.get('LiquidClii') + 1000);
              }
            }
            else {
              if(!msg.member.roles.cache.has('942243177975410698')){
                msg.channel.send({
                  "embeds": [{
                    "title": `${msg.author.id}さん、コインが足りません！`,
                    "description": `必要な金額 : 1000 CliPoint\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
                    "color": "RANDOM",
                    "footer": {
                      "text": "LiquidClii V2"
                    }
                  }]
                });
              }
            }
          }
        }
        else {
          msg.channel.send({
            "embeds": [{
              "title": `${msg.author.username}さん、コインが足りません！`,
              "description": `必要な金額 : 100 CliPoint\nあなたの持っている金額 : ${config.get(msg.author.id)} CliPoint`,
              "color": "RANDOM",
              "footer": {
                "text": "LiquidClii V2"
              }
            }]
          });
        }

        console.log('🤔');
      }
      catch(e) {
        config.set(msg.author.id, 10);
      }
    }

    config.set(msg.author.id, config.get(msg.author.id) + msg.content.length);
  }
});

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('938211059246989405').send({
    "embeds": [{
      "title": "welcome to mf7cli Server 2022.",
      "description": `${member} まず.helloと入力してメンバーになりましょう。`,
      "color": 1688215,
      "footer": {
        "text": "LiquidClii V2"
      }
    }]
  });

  config.set(member.user.username, 10);

  user_config.set(msg.author.id, {
    name: member.user.username,
    obj: []
  });
});

client.on("guildMemberRemove", member => {
  member.guild.channels.cache.get('941224373543657493').send({
    "embeds": [{
      "title": "Goodbye.",
      "description": `${member.displayName}が退出しました。`,
      "color": "RANDOM",
      "footer": {
        "text": "LiquidClii V2"
      }
    }]
  });

  config.set(msg.author.id, 0);
})

client.login('API Key');

var job = schedule.scheduleJob({
  hour   : 22,
  minute:  00
}, function () {
  client.guilds.cache.get('938211058517151754').channels.cache.get('941471304350052413').send({
    "embeds": [{
      "title": `22時のZIP_Muryobochi`,
      "description": `${zip_rss}`,
      "url": "https://twitter.com/ZIP_Muryobochi",
      "color": "RANDOM",
      "footer": {
        "text": "LiquidClii V2"
      }
    }]
  });
});

var job2 = schedule.scheduleJob({
  hour   : 15,
  minute:  00
}, function () {
  client.guilds.cache.get('938211058517151754').channels.cache.get('941471304350052413').send({
    "embeds": [{
      "title": `15時のZIP_Muryobochi`,
      "description": `${zip_rss}`,
      "url": "https://twitter.com/ZIP_Muryobochi",
      "color": "RANDOM",
      "footer": {
        "text": "LiquidClii V2"
      }
    }]
  });
});

var job3 = schedule.scheduleJob({
  hour   : 23,
  minute:  44
}, function () {
  client.guilds.cache.get('938211058517151754').channels.cache.get('941471304350052413').send({
    "embeds": [{
      "title": `栗を収穫しました！`,
      "description": `みなさんに100 CliPoint差し上げます！`,
      "color": "RANDOM",
      "footer": {
        "text": "LiquidClii V2"
      }
    }]
  });

  client.guilds.cache.get('938211058517151754').members.fetch()
  .then(members => Promise.all(members.map(member => {
      config.set(member.user.username, config.get(member.user.username) + 100);
      config.set('LiquidClii', config.get('LiquidClii') - 100);
    }
  )));
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  const users = reaction.message.guild.members.resolve(user);
  const check = await joblist.get('reaction_job');

  //jobにIDが登録されてるか確認(true:false)
  if (check[0] == reaction.message.id) {
    if(check[2] == 'sp_boot'){
      if(user.username === '')
      reaction.users.remove(user);
      console.log('😟');
      //reactにリアクションされた絵文字が入っているか
      if (react.includes(reaction.emoji.name)) {
        const num = react.join("").split(reaction.emoji.name)[0].length / 2;
        joblist.set('reaction_job', '');
        sp(num, user.id, reaction.message);
      }
      else{
        console.log('😭');
      }
    }
    else if(check[2] == 'sp_task'){
      if(user.username === '')
      reaction.users.remove(user);
      console.log('😟');
      //reactにリアクションされた絵文字が入っているか
      if (react_1.includes(reaction.emoji.name)) {
        const num = react_1.join("").split(reaction.emoji.name)[0].length / 2;
        sp_1(num, user.id, reaction.message, user, reaction);
      }
      else{
        console.log('😭');
      }
    }
  }
  else{
    console.log(reaction.message.id + '\n' + check[0]);
    return;
  }
});

function sp_1 (num, user, msgid, react_user, reaction) {
  var obj = user_config.get(user);
  if(num = 4){
    msgid.delete();
  }
  // if(num = 1){
  //   try{
  //     connection = joinVoiceChannel({
  //       channelId: reaction.message.member.voice.channel.id,
  //       guildId: reaction.message.guild.id,
  //       adapterCreator: reaction.message.guild.voiceAdapterCreator()
  //     });
  //     let resource = createAudioResource('music/&.mp3', {
  //       inputType: StreamType.Arbitrary,
  //     });
  //     if(client.guilds.cache.me.voice.channel?.type == 'GUILD_STAGE_VOICE'){
  //       reaction.message.guild.me.voice.setRequestToSpeak(true);
  //     }
  //     const player = createAudioPlayer();
  //     connection.subscribe(player);
  //     player.play(resource);   
  //   }
  //   catch(e){
  //     console.log(e)
  //   }

  //   msgid.channel.send("ボイスチャンネルに参加しました。");
  // }
}

function sp (num, user, msgid) {
  var obj = user_config.get(user);
  var spname = obj["obj"][num];
  if(spname === android_sp[0]){
    msgid.edit({
      "embeds": [{
        "title": `${spname}`,
        "description": `
        🎵 📼 📧\n
        `,
        "color": "RANDOM",
        "footer": {
          "text": "LiquidClii V2"
        }
      }]
    });
    msgid.reactions.removeAll();
    msgid.react('🎵');
    msgid.react('📼');
    msgid.react('📧');
    msgid.react('❌');
    joblist.set('reaction_job', [msgid.id, 4, 'sp_task']);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) { // 2
    return;
  }
  if (interaction.commandName === 'hello') {
    var roleId = "938211897004679209";
    interaction.member.roles.add(`${roleId}`);
    await interaction.reply({
        embeds: [{
            description: `Granted the role <@&${roleId}>`,
            color: "RANDOM"
        }]
    });

    config.set(interaction.member.id, config.get(interaction.member.id) + 100);
  }
  if (interaction.commandName === 'have') {
    await interaction.reply({
      "embeds": [{
        "title": `${interaction.member.user.username}さんの持っている金額。`,
        "description": `${config.get(interaction.member.id)} CliPoint`,
        "color": "RANDOM",
        "footer": {
          "text": "LiquidClii V2"
        }
      }]
    });
  }
});