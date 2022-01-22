const http = require('http');
http.createServer(function (req, res) {
  res.write("online");
  res.end();
}).listen(8080);

function sleep(waitSec, callback) {  
  setTimeout(callback, waitSec);
}
const discord = require('discord.js');
require('@discordjs/opus');
const client = new discord.Client();

client.on('ready', () => {
  console.log('ready');
  client.user.setActivity('YouTube', { type: 'WATCHING' });
})

client.on('message', message => {
  const sender        = message.member;
  const voiceChannel  = sender.voice.channel;
  var server = ["916599251222528021","920177539308204092"]
  if (!message.guild.id == server) return;
  if (message.guild.id == "920177539308204092"){
    if(message.content === '.hello'){
      var roleId = "920178213999759410";
      var welcomeCh = message.guild.channels.cache.get("920178837701152819");
      message.member.roles.add(`${roleId}`);
      message.reply({
          embed: {
              description: `Granted the role <@&${roleId}>`,
              color: "RANDOM"
          }
      });
      welcomeCh.send(`Hello <@${message.author.id}>.`);
    }
  }
  //mf7cliServer
  if (message.guild.id == "916599251222528021"){
    if(message.author.bot) return;
    if(message.content === '集合'){
      message.channel.send('はーい');
    }

    //コマンド
    if(message.content === '.virus'){
      var VirusType = ["waryu Command", "Windows10"];
      var virus = VirusType[Math.floor(Math.random() * VirusType.length)]
      message.channel.send(`「${virus}」が検出されました！`);
    }
    if(message.content.match('.sudo')){
      if(message.author.id == "866083131433943050"){
        message.channel.send("須藤さんをお呼びしています…");
      }
      else{
        message.channel.send(`発言者がmf7cliである必要があります。`);
      }
    }
    if(message.content === '.hello'){
      if(message.channel.id == "919465469889617932") return;
      var roleId = "916601901603246081";
      var welcomeCh = message.guild.channels.cache.get("916602666698801204");
      var fromArray = ["やってきました。", "侵入してきました。"];
      var from = fromArray[Math.floor(Math.random() * fromArray.length)];
      message.member.roles.add(`${roleId}`);
      message.reply({
          embed: {
              description: `<@&${roleId}>を付与しました 🤔`,
              color: "RANDOM"
          }
      });
      welcomeCh.send(`@here <@${message.author.id}>さんが${from}`);
    }
    //LiquidWorld
    if(message.content === '.ad'){
      if(!message.channel.id == "919465469889617932") return;
      message.channel.send('どらきめどらきめどらきめどらきめ どらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\nどらきめどらきめどらきめどらきめどらきめどらきめ\n');
    }
    if(message.content === '.join'){
      if(message.author.id == "866083131433943050"){
        try {
          message.channel.send('テスト中の機能です！\n（.leaveで切断できます。）');
          // 同じボイスチャンネルに接続
          voiceChannel.join().then(connection => {
            connection.play('./ばれなきゃ犯罪じゃないんですよぉ.mp3');
          });
        }catch(e) {
          message.channel.send(e.message);
        }
      }
      else{
        message.channel.send('現在mf7cli以外このコマンドを使用できません。');
      }
    }
    if(message.content === '.leave'){
      if(message.author.id == "866083131433943050"){
        // 同じボイスチャンネルを切断
        voiceChannel.leave();
        message.channel.send('音楽の再生を終了しました！\nまたのご利用をお待ちしております！');
      }
      else{
        message.channel.send('現在mf7cli以外このコマンドを使用できません。');
      }
    }
  }
})

client.login(process.env.TOKEN);
