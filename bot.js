const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 let port = process.env.PORT || 3000;
app.listen(port)
 
require('dotenv').config()
///////////////////////EMPIEZA/TU/BOT//////////////////////////////abajo de acá va el codigo xd
const {Client, MessageEmbed, VoiceConnection, MessageAttachment } = require('discord.js');
const client = new Client;
//const { TOKEN, PREFIX } = require('./config');
const ping = require('minecraft-server-util');
const Zeew = require("zeew");
const discordTTS=require("discord-tts-spanish");
const img = new Zeew.img("600456ada1471c4ed2479f55");
//const config = require('./config/config.json');
//



//
//añadido
function presence(){
    client.user.setPresence({
        status: "online",
        activity: {
            name: "viva el imperio",
            type: "PLAYING" //LISTENING, PLAYING, STREAMING , WATCHING, CUSTOM_STATUS
        }
    })
}
let nameserver = "Imperio Bizantino"

client.on('guildMemberAdd', async (member) => {
  let nameserver = "Imperio Bizantino"
  let server = client.guilds.cache.get("856352029873537024");
  let canal = member.guild.channels.cache.get("856352987886780446")
  const card = new img.card

      .bienvenida()
      .token("600456ada1471c4ed2479f55")
      .estilo("classic")
      .avatar(member.user.displayAvatarURL({format:  "png"}))
      .fondo("https://i.imgur.com/jObw1Gh.png")
      .colorTit("#FF0606")
      .titulo(`Bienvenido ${member.user.username}`)
      .colorDesc("#FFED10")
      .descripcion("Disfruta tu estadia en el servidor");

const render = await img.card.render(card);

// Attachem para envitar archivos , en este caso la tarjeta 
const file = new MessageAttachment(render, 'bienvenida.png');
// Creacion de embed
const embed = new MessageEmbed() 
        // mandando la imagen en el embed
    .setImage('attachment://bienvenida.png');

// mandando la imagen
canal.send({files: [file] });


});

client.on('ready', () => {
  console.log(`El bot esta online y la ID del bot es ${client.user.tag}!`);
  presence();
});


client.on('message', async message => {

    const prefix = "b!"
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command == 'skin'){
    let skin = args.join(' ') //Nombre de la skin

    if (!args[0]) { //Si no proporciona el nombre de la skin
        return message.channel.send("Dime el nombre de una skin") //Esto enviara un mensaje si no se envió el nombre de la skin
    }

    let url = `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${skin}/700`;  //Esto sera la imagen de la skin

    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription("`Nick:` "+skin+"")
    .setImage(url)

message.channel.send(embed) //Enviamos el embed al canal
       }

//inicio tickets
if(message.content.startsWith("b!asdas")){
const embed = new MessageEmbed()
.setTitle("test")
.setDescription("asdasd")
//Demas propiedades del embed que quieras
message.channel.send(embed).then(m => {
                    m.react('✅')
                })

}

if(message.content.startsWith("say test 123")){
   const voiceChannel = message.member.voice.channel; // Una const para saber si el usuario entro a un canal de voz
    
    let decir = args[0];  // Una const para definir lor argumentos a decir / escribir

    if(!voiceChannel) return message.channel.send('**<a:No:769884924995829800> | Entra a un canal de voz y vuelve a intentarlo.**') // Si la const voiceChannel es false retorna este mensaje

    if(!decir) return message.channel.send('**<a:No:769884924995829800> | ¿Que quieres que diga?**') // Si la const decir es false retorna este mensaje

    voiceChannel.join().then(connection => { 
        const stream = discordTTS.getVoiceStream(decir); // Hacemos una const para conectar con discord-tts y dentro ponemos >decir>(los argumentos que se escucharan) 
        const dispatcher = connection.play(stream);// Hacemos la conexion y lo reproducimos
        dispatcher.on("finish",()=>voiceChannel.leave())// Cuando finalize el tts el bot saldra automaticamente del canal
  })
    }


//fin musica

    if(message.content.startsWith("b!avisar")){//canal actualizaciones
    if (message.member.hasPermission('ADMINISTRATOR')){ 
        ///El primer argumento seria el tema
                let tema = args[0];
        ///El segundo seria la sugerencia
                let avisos = args.slice(1).join(' ');
        ///Establecemos un canal donde se mandara la sugerencua
                let canalsete = client.channels.cache.get('856565132376801320');//<- lo probe obviamente con su canal ID respectivo, pero no lo pongo para la foto
        
        ///hacemos el mensaje embed
                const avisardo = new MessageEmbed()
        ///El autor del la sugerencia
                .setAuthor(`Autor: ${message.author.tag}`, message.author.displayAvatarURL())
        
                .setDescription(`**Tema:** ${tema} \n**Información:** ${avisos}`)
                .setColor(0xeaff00)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(nameserver, client.user.displayAvatarURL());
        
        ///Mandaremos un mensaje al momento de mandar la sugerencia
                message.reply("Aviso enviado con exito!").then(msg => msg.delete({timeout: 5000}));
        
        
                canalsete.send(avisardo)
               // canalsete.send("@everyone" + "") //enviamos el mensaje en el canal que queremos, y el mensaje en este caso es un embed
        ///Agregamos reacciones a la sugerencia, esto es a su gusto!
        ////Eliminamos el comando enviado
                 message.delete()
            }else{
      message.reply("No tienes permisos para usar ese comando")
    }//si no tiene los permisos suficientes pasara eso
    }
    
       if(command == 'say'){

        const channel = message.mentions.channels.first() // Definimos la constante del canal al que vamos a enviar el mensaje

        let sendch = message.guild.channels.cache.find(channel => channel.name === `${channel}`) 
        // Creamos la "variable" sendch en busca del canal mencionado anteriormente en channel
        let as = args.slice(1).join(' '); 
        // Creamos la variable del contenido que tendrá el mensaje por argumentos 
        if (!channel) return message.channel.send('Especifica el canal') 
        // Si no especifica el canal retornamos un mensaje exiguiendole que mencione el canal
        if (!as) return message.channel.send('Especifica lo que quieres decir');
         // Si no menciona lo que va a decir el BOT retornamos un mensaje que lo exigua

         const embed = new MessageEmbed()
         .setColor(1752220)
         .addField("Aviso:", as)
  

        channel.send(embed); 
        // Enviamos el contenido de el argumento al canal anteriormente mencionado
         }
       


//baneos
if(message.content.startsWith("b!help") || message.content.startsWith("b!ayuda")){
///El primer argumento seria el tema
///El segundo seria la sugerencia
///Establecemos un canal donde se mandara la sugerencua
        //let canal = client.channels.cache.get('795061332448641044');//<- lo probe obviamente con su canal ID respectivo, pero no lo pongo para la foto
///hacemos el mensaje embed
        const vip = new MessageEmbed()
///El autor del la sugerencia
        //.setAuthor(`Autor: ${message.author.tag}`, message.author.displayAvatarURL())

        .setTitle(`${nameserver} | Comandos`)
        .addField("Comandos: ", "\n**b!mapa**: Comando para obtener el link del mapa. \n**b!skin**: Podras visualizar tu skin.\n**b!vote**: No esta disponible.\n**b!ip**: El bot respondera con la ip. ", true)
        .setColor(0xeaff00)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`${nameserver}!`,client.user.displayAvatarURL());
        message.channel.send(vip)

   
    
}

if(message.content.startsWith("b!mapa") || message.content.startsWith("b!map") || message.content.startsWith("!mapa")){

       const pagina1 = new MessageEmbed()
       .setTitle("http://207.38.87.75:8088")
       .setColor(1752220)
       .setFooter(`${nameserver} | Mapa`, client.user.displayAvatarURL());
      message.channel.send(pagina1)


}

if(message.content.startsWith("latzi") || message.content.startsWith("Latzi")){
  message.channel.send("elpepe")
}
/*
  if(message.content.startsWith("violafoxys") || message.content.startsWith("foxygay")){
  message.channel.send("@everyone");
    message.channel.send("violafoxys");
    message.channel.send("@Latzimirovich#1346");
}
*/
//www.discord.gg/invite/fu8RCmdrHb

//inicio invi
if(message.content.startsWith("b!discord") || message.content.startsWith("!discord")){
  message.reply("\n**Imperio Bizantino**: https://discord.gg/fu8RCmdrHb\n**Ancient**: censurado");
}
//fin invi

if(message.content.startsWith("b!texturas") || message.content.startsWith("b!textura") || message.content.startsWith("!texturas")){
           const pagina2 = new MessageEmbed()
       .setTitle("**OPTIFINE OBLIGATORIO :**")
       .setColor(1752220)
       .setFooter(`${nameserver} | Texturas`, client.user.displayAvatarURL());
      message.channel.send(pagina2)
}

if(message.content.startsWith("nood")){
  message.channel.send("Emanuel");
}else if(message.content.startsWith("emanuel")){
  message.channel.send("Nood");
}
if(message.content.startsWith("moon")){
  message.channel.send("diga XD");
}

if(message.content.startsWith("b!ip") || message.content.startsWith("!ip")){
  message.channel.send("La ip es : `play.ancientnetwork.tk`");
}

if(message.content.startsWith("jogi") || message.content.startsWith("Jogi")){
message.channel.send("digamelo");
}

if(message.content.startsWith("hola")){
  message.channel.send("que te pasa maraco qliao\n ijue la perra\nijo e la traga cemen");
}

if(message.content.startsWith("megatula")|| message.content.startsWith("MEGATAURA")){
  message.channel.send("mati manco de meirda hijo de la gran prostituta");
}


if(message.content.startsWith("sbleit")|| message.content.startsWith("Sbleit")){
  message.channel.send("QUE QUEREI CTM");
}

//rewglas    
   if(message.content.startsWith("k!25343")){
///El primer argumento seria el tema
///El segundo seria la sugerencia
///Establecemos un canal donde se mandara la sugerencua
        //let canal = client.channels.cache.get('795061332448641044');//<- lo probe obviamente con su canal ID respectivo, pero no lo pongo para la foto
///hacemos el mensaje embed
        const vip = new MessageEmbed()
///El autor del la sugerencia
        //.setAuthor(`Autor: ${message.author.tag}`, message.author.displayAvatarURL())

        .setTitle(`${nameserver} | Oficios`)
        .addField("Estos son los Oficios disponibles en el Imperio Bizantino, si deseas entrar en alguno solo lo mencionas y se te lo asignara, consecutivamente si no encajas en el oficio puedes cambiarlo o te asignaremos otro conforme tú desempeño se mire", "\n- Agricultor (Todo tipo de cultivo\n- Armero (Mele, a distancia)\n- Construcotr de edificios\n- Cantinero de alcohol\n- Cantinero de pociones\n- Farmeador (materiales normales , ejemplo: madera, tierra, piedra, arena, etc)\n- Granjero (Vacas, pollos, ovejas)\n- Bibliotecario (Solamente libros)\n- Constructor de granjas (de materiales)\n- Minero (Diamantes, esmeraldas, etc)\n- Ayudante (en cualquier tipo de trabajo que se le necesite)\n- Secretario/a (trabajo al que se le asignara a una persona comprometida que llevara todos los nombres de la gente y sus respectivos trabajos)\n- Rangos como: **Corte Imperial**, **Realeza**, **Nobleza**, etc. Se deberan ganar por su ayuda y lealtad.\n Estos oficios ayudaran al reparto de responsabilidades en el Imperio y sobretodo a llevar un buen proceso de crecimiento en abastecimiento y fortalecimiento interno. ", true)
        .setColor(0xeaff00)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`${nameserver} | Oficios`,client.user.displayAvatarURL());
        message.channel.send(vip)
        message.channel.send("@everyone");
   }
//fin reglas


//fin si
//Inicio

//no

});//fin



client.login(process.env.token)
