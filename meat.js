var settingsSantize = {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','marquee','button','input'
    ,'details','summary','progress','meter','font','h1','h2','span','select','option','abbr',
    'acronym','adress','article','aside','bdi','bdo','big','center','site',
    'data','datalist','dl','del','dfn','dialog','dir','dl','dt','fieldset',
    'figure','figcaption','header','ins','kbd','legend','mark','nav',
    'optgroup','form','q','reveal','rp','rt','ruby','s','sample','section','small',
    'sub','sup','template','textarea','tt','u'],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    p:['align'],
    table:['align','border','bgcolor','cellpadding','cellspadding','frame','rules','width'],
    tbody:['align','valign'],
    tfoot:['align','valign'],
    td:['align','colspan','headers','nowrap'],
    th:['align','colspan','headers','nowrap'],
    textarea:['cols','dirname','disabled','placeholder','maxlength','readonly','required','rows','wrap'],
    pre:['width'],
    ol:['compact','reversed','start','type'],
    option:['disabled'],
    optgroup:['disabled','label','selected'],
    legend: ['align'],
    li:['type','value'],
    hr:['align','noshade','size','width'],
    fieldset:['disabled'],
    dialog:['open'],
    dir:['compact'],
    bdo:['dir'],
    div:['class'],
    marquee:['behavior','bgcolor','direction','width','height','loop'],
    button: ['disabled'],
    input:['value','type','disabled','maxlength','max','min','placeholder','readonly','required'],
    details:['open'],
    div:['align'],
    progress:['value','max'],
    meter:['value','max','min','optimum','low','high'],
    font:['size','family','color'],
    select:['disabled','multiple','require'],
    ul:['type','compact'],  
    "*":['hidden','spellcheck','title','contenteditable','data-style','style']
  },
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' , 'wbr'],
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'data' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true
} 
  // Code by ItzCrazyScout and 'HOST'

function emojify(txt){
    return txt.replace(/:(bonzi|evil|pink|earth|globe|sad|doggis|program|swag|flip):/g,"<img src=\"/img/emoji/$1.png\">")
}

function markup(text){
    if(text.startsWith("++")){
        return text.slice(2)
    }
    text = text.replace(/%%%%/g,"<br>")
    text = text.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>")
    text = text.replace(/\*(.*?)\*/g,"<i>$1</i>")
    text = text.replace(/\~\~(.*?)\~\~/g,"<s>$1</s>")
    text = text.replace(/`(.*?)`/g,"<code>$1</code>")
    text = text.replace(/(<br>|^)>(.*?)(<br>|$)/g,"$1<div data-style=\"quote\">$2</div>")
    return text
}

var settingsSantize = {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','marquee','button','input'
    ,'details','summary','progress','meter','font','h1','h2','span','select','option','abbr',
    'acronym','adress','article','aside','bdi','bdo','big','center','site',
    'data','datalist','dl','del','dfn','dialog','dir','dl','dt','fieldset',
    'figure','figcaption','header','ins','kbd','legend','mark','nav',
    'optgroup','form','q','reveal','rp','rt','ruby','s','sample','section','small',
    'sub','sup','template','textarea','tt','u'],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    p:['align'],
    table:['align','border','bgcolor','cellpadding','cellspadding','frame','rules','width'],
    tbody:['align','valign'],
    tfoot:['align','valign'],
    td:['align','colspan','headers','nowrap'],
    th:['align','colspan','headers','nowrap'],
    textarea:['cols','dirname','disabled','placeholder','maxlength','readonly','required','rows','wrap'],
    pre:['width'],
    ol:['compact','reversed','start','type'],
    option:['disabled'],
    optgroup:['disabled','label','selected'],
    legend: ['align'],
    li:['type','value'],
    hr:['align','noshade','size','width'],
    fieldset:['disabled'],
    dialog:['open'],
    dir:['compact'],
    bdo:['dir'],
    div:['class'],
    marquee:['behavior','bgcolor','direction','width','height','loop'],
    button: ['disabled'],
    input:['value','type','disabled','maxlength','max','min','placeholder','readonly','required'],
    details:['open'],
    div:['align'],
    progress:['value','max'],
    meter:['value','max','min','optimum','low','high'],
    font:['size','family','color'],
    select:['disabled','multiple','require'],
    ul:['type','compact'],  
    "*":['hidden','spellcheck','title','contenteditable','data-style','style']
  },
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' , 'wbr'],
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'data' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true
} 
const log = require("./log.js").log;
const Ban = require("./ban.js");
const Utils = require("./utils.js");
const io = require('./index.js').io;
const settings = require("./settings.json");
const sanitize = require('sanitize-html');

let roomsPublic = [];
let rooms = {};
let usersAll = [];

exports.beat = function() {
    io.on('connection', function(socket) {
        new User(socket);
    });
};

function checkRoomEmpty(room) {
    if (room.users.length != 0) return;

    log.info.log('debug', 'removeRoom', {
        room: room
    });

    let publicIndex = roomsPublic.indexOf(room.rid);
    if (publicIndex != -1)
        roomsPublic.splice(publicIndex, 1);

    room.deconstruct();
    delete rooms[room.rid];
    delete room;
}

class Room {
    constructor(rid, prefs) {
        this.rid = rid;
        this.prefs = prefs;
        this.users = [];
    }

    deconstruct() {
        try {
            this.users.forEach((user) => {
                user.disconnect();
            });
        } catch (e) {
            log.info.log('warn', 'roomDeconstruct', {
                e: e,
                thisCtx: this
            });
        }
        //delete this.rid;
        //delete this.prefs;
        //delete this.users;
    }

    isFull() {
        return this.users.length >= this.prefs.room_max;
    }

    join(user) {
        user.socket.join(this.rid);
        this.users.push(user);

        this.updateUser(user);
    }

    leave(user) {
        // HACK
        try {
            this.emit('leave', {
                 guid: user.guid
            });

            let userIndex = this.users.indexOf(user);

            if (userIndex == -1) return;
            this.users.splice(userIndex, 1);

            checkRoomEmpty(this);
        } catch(e) {
            log.info.log('warn', 'roomLeave', {
                e: e,
                thisCtx: this
            });
        }
    }

    updateUser(user) {
    this.emit('update', {
      guid: user.guid,
      userPublic: user.public
        });
    }

    getUsersPublic() {
        let usersPublic = {};
        this.users.forEach((user) => {
            usersPublic[user.guid] = user.public;
        });
        return usersPublic;
    }

    emit(cmd, data) {
    io.to(this.rid).emit(cmd, data);
    }
}

function newRoom(rid, prefs) {
    rooms[rid] = new Room(rid, prefs);
    log.info.log('debug', 'newRoom', {
        rid: rid
    });
}

let userCommands = {
  "godmode": function(word) {
      let success = word == this.room.prefs.godword;
      if (success) this.private.runlevel = 3;
    this.socket.emit('admin');
      log.info.log('debug', 'godmode', {
          guid: this.guid,
          success: success,
      });
  },
    "sanitize": function() {
        let sanitizeTerms = ["false", "off", "disable", "disabled", "f", "no", "n"];
        let argsString = Utils.argsString(arguments);
        this.private.sanitize = !sanitizeTerms.includes(argsString.toLowerCase());
    },
    "joke": function() {
        this.room.emit("joke", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "fact": function() {
        this.room.emit("fact", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "youtube": function(vidRaw) {

			if(vidRaw.includes("\"")){
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
			if(vidRaw.includes("'")){ 
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("youtube", {
            guid: this.guid,
            vid: vid
        });
    },
    "video": function(vidRaw) {

			if(vidRaw.includes("\"")){
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
			if(vidRaw.includes("'")){ 
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("video", {
            guid: this.guid,
            vid: vid
        });
    },
    "video_autores": function(vidRaw) {

			if(vidRaw.includes("\"")){
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
			if(vidRaw.includes("'")){ 
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("video_autores", {
            guid: this.guid,
            vid: vid
        });
    },
    "image": function(vidRaw) {

			if(vidRaw.includes("\"")){
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
			if(vidRaw.includes("'")){ 
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("image", {
            guid: this.guid,
            vid: vid
        });
    },
    "iframe": function(vidRaw) {

			if(vidRaw.includes("\"")){
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
			if(vidRaw.includes("'")){ 
				this.room.emit("talk", {
					guid: this.guid,
					text: "I'M PRETENDING TO BE A 1337 HAX0R BUT I'M ACTUALLY A SKRIPT KIDDIE LMAO"
				}); 
				return;
			}
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("iframe", {
            guid: this.guid,
            vid: vid
        });
    },
  kick:function(data){
      if(this.private.runlevel<3){
          this.socket.emit('alert','admin=true')
          return;
      }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            target.socket.emit("kick", {
                reason: "You got kicked.",
            });
            target.disconnect();
        } else {
          this.socket.emit('alert','The user you are trying to kick left. Get dunked on nerd')
      }
  },
  css:function(...txt){
      this.room.emit('css',{
          guid:this.guid,
          css:txt.join(' ')
      })
  },
    ban: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "admin=true");
            return;
        }
        
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.getIp() == "::1") {
                Ban.removeBan(target.getIp());
            } else if (target.getIp() == "::ffff:127.0.0.1") {
                Ban.removeBan(target.getIp());
            } else {
                if (target.private.runlevel > 2 && this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1") {
                    return;
                }
                Ban.addBan(target.getIp(), 24 * 3600, "You got banned.");
                target.socket.emit("ban", {
                    reason: data.reason,
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to ban left. Get dunked on nerd");
        }
    },
  "unban": function(ip) {
  Ban.removeBan(ip)
  },
  sendraw:function(...txt){
      this.room.emit('sendraw',{
          guid:this.guid,
          text:txt.join(' ')
      })
  },
    "backflip": function(swag) {
        this.room.emit("backflip", {
            guid: this.guid,
            swag: swag == "swag"
        });
    },
    "swag": function() {
        this.room.emit("swag", {
            guid: this.guid
        });
    },
    "bang": function() {
        this.room.emit("bang", {
            guid: this.guid
        });
    },
    "earth": function() {
        this.room.emit("earth", {
            guid: this.guid
        });
    },
    "grin": function() {
        this.room.emit("grin", {
            guid: this.guid
        });
    },
	"clap":function(){
		this.room.emit("clap", {
		  guid: this.guid,
		});
	},
    "shrug": function() {
        this.room.emit("shrug", {
            guid: this.guid,
        });
    },
    "linux": "passthrough",
    "pawn": "passthrough",
    "bees": "passthrough",
    "color": function(color) {
        if (typeof color != "undefined") {
            if (settings.bonziColors.indexOf(color) == -1)
                return;

            this.public.color = color;
        } else {
            let bc = settings.bonziColors;
            this.public.color = bc[
                Math.floor(Math.random() * bc.length)
            ];
        }

        this.room.updateUser(this);
    },
    "pope": function() {
        this.public.color = "pope";
        this.room.updateUser(this);
    },
    "pope2": function() {
        this.public.color = "pope2";
        this.room.updateUser(this);
    },
    "pope3": function() {
        this.public.color = "pope3";
        this.room.updateUser(this);
    },
    "pope4": function() {
        this.public.color = "pope4";
        this.room.updateUser(this);
    },
    "pope5": function() {
        this.public.color = "pope5";
        this.room.updateUser(this);
    },
    "pope6": function() {
        this.public.color = "pope6";
        this.room.updateUser(this);
    },
    "pope7": function() {
        this.public.color = "pope7";
        this.room.updateUser(this);
    },
    "pope8": function() {
        this.public.color = "pope8";
        this.room.updateUser(this);
    },
    "pope9": function() {
        this.public.color = "pope9";
        this.room.updateUser(this);
    },
    "pope10": function() {
        this.public.color = "pope10";
        this.room.updateUser(this);
    },
    "ics": function() {
        this.public.color = "ics";
        this.room.updateUser(this);
    },
    "zander": function() {
        this.public.color = "zander";
        this.room.updateUser(this);
    },
    "notpope": function() {
        this.public.color = "notpope";
        this.room.updateUser(this);
    },
    "popeh": function() {
        this.public.color = "popeh";
        this.room.updateUser(this);
    },
    "popehat": function() {
        this.public.color = "popehat";
        this.room.updateUser(this);
    },
    "god": function() {
        this.public.color = "god";
        this.room.updateUser(this);
    },
  wtf: function () {
      var wtf = [
          "i cut a hole in my computer so i can fuck it",
          "i hate minorities",
          "i said /godmode password and it didnt work",
          "i like to imagine i have sex with my little pony characters",
          "ok yall are grounded grounded grounded grounded grounded grounded grounded grounded grounded for 64390863098630985 years go to ur room",
          "i like to eat dog crap off the ground",
          "i can use inspect element to change your name so i can bully you",
          "i can ban you, my dad is seamus",
          "why do woman reject me, i know i masturbate in public and dont shower but still",
          "put your dick in my nose and lets have nasal sex",
          "my cock is 6 ft so ladies please suck it",
          "I just paid 1000 dollars for damn fucking stand cause I love Apple products so much",
          "I am Andrej Akan from Collab VM, I am a forkie who loves to destroy Windows with regedit and claim that I live in Pakistan although I actulally live in Croatia.",
          "Hi I am vacbedlover want to show my sexual fetish by making VM to show stupid BSDM shit, catgirl shit, vacbed and install North Korean shits on VM. I juse keep evading ban on Collab VM to act like a forkie.",
          "please make pope free",
          "whats that color",
          "i listen to baby from justin bieber",
          "i watch numberblocks",
          "Fune: BANZI.LEL BEST SERVA!",
          "i watch doodland and now people are calling me a doodtard",
          "i watch bfdi and now people are calling me a objecttard",
          "i post klasky csupo effects and now people are calling me a logotard",
          "i inflate people, and body inflation is my fetish.",
          "i installed BonziBUDDY on my pc and now i have a virus",
          "i deleted system32",
          "i flood servers, and that makes me cool.",
          "i still use the wii u&trade;",
          "i used homebrew on my nintendo switch and i got banned",
          "i bricked my wii",
          "muda muda muda muda!",
          'i am going to post inflation videos because, remember: "I inflate people and inflation is my fetish."',
          "i copy other people's usernames",
          "i use collaborative virtual machine to install malware",
          "i use microsoft agent scripting helper for fighting videos against innocent people that did nothing wrong by just friendly commenting",
          "i use microsoft agent scripting helper for gotard videos",
          "i use hotswap for my xbox 360",
          "i boycotted left 4 dead 2 and then eventually bought the game",
          "CAN U PLZ UNBAN ME PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ",
          "I made The Rebellion of SeamusMario55&trade;",
          "I like Unbojih",
          "ItzCrazyScout, No! More like.... ekfheiophjeodxenwobifuodhndoxnwsiohbdeiowdhn2werifhwefief! He banned euhdeioqwdheiwohjixzojqsioh r23oipwshnwq! End of rant.",
          "i play left 4 dead games 24/7",
          "i am so cool. i shit on people, add reactions  that make fun of users on discord, and abuse my admin powers. i am really so cool.",
          "This product will not operate when connected to a device which makes unauthorized copies. Please refer to your instruction booklet for more information.",
          "hey medic i like doodland",
          "i installed windows xp on my real computer",
          "i am whistler and i like to say no u all the time",
          "i like to give my viewers anxiety",
          "how to make a bonziworld server?",
          "shock, blood loss, infection; oh ho ho ho ho, i love stabbing. i feel tres bon!",
          "prego.",
          "oh you're approaching me!",
          "MUTED! HEY EVERYONE LOOK AT ME I SAY MUTED IN ALL CAPS WHEN I MUTE SOMEONE LMAO",
          "i like loliest huhytre",
          "can you boost my server? no? you're mean! >:(",
          "no u",
          "OH OH OH OH OH OH! JOESPH JUDGE! HOW DARE YOU SHUT DOWN BONZIWORLD?! THATS It! YOU'RE GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED GROUNDED FOR 239805479837389274328943729832749382743298 YEARS!",
          "numberblocks is my fetish",
          "i post random gummibar videos on bonziworld",
          "i support meatballmars",
          "PLEASE GIVE THIS VIDEO LIKES!!!!! I CANNOT TAKE IT ANYMORE!",
          "I WILL MAKE A BAD VIDEO OUT OF YOU! GRRRRRRRRRRRR!",
          "Muted",
          "You were the one who started the drama most of the time-",
          "i keep watching doodland like forever now",
          "i mined diamonds with a wooden pickaxe",
          "i kept asking for admin and now i got muted",
          "I FAP TO FEMMEPYRO NO JOKE",
          "i am not kid",
          "i am a gamer girl yes not man no im not man i am gamer girl so give me money and ill giv you my adress <3",
          "i support fune",
          "i support pinkfong",
          "i support hogi",
          "i support baby shark brooklyn",
          "bonzi.lol is the best site ever!",
          "Pinkfong is the best channel ever!",
          "Hogi is the best channel ever!",
          "Bebefinn is the best channel ever!",
          "Baby Shark Broolyn is the best channel ever!",
          "seamus is a pe- NO YOU FUCKING DON'T!",
          "seamus is a nig- NO YOU FUCKING DON'T!",
          "bonzipedia is the best wiki ever",
          "baby shark is the best song ever",
          "The Potty Song is the best song ever",
          "Hello my name is fune and i am obsessed with pedos and groomers so much that i accuse random people of being a pedo and a groomer without any proof and also like to make fake screenshots out of them doing disgusting shit.",
          "Hello my name is pinkfong and i am obsessed with baby shark, nursery rhymes and the potty song so much that i accuse random people of being a pinkfong fan and a nursery rhyme supporter and also like to make nursery rhyme song shit.",
          "I LIKE PINKFONG! ALSO HOGI IS A THE BEST!!!! I HATE PINKFONG HATERS!!! PINKFONG IS THE BEST!!!!!",
          "I LIKE FUNE! ALSO NANO IS A THE BEST!!!! I HATE OTHER BONZIWORLD SITES!!! BONZI DOT LOL IS A THE BEST!!!!!",
          "choccy milk is good",
          "My name is goober and i'm totally not a spy!",
          "bonziworld gave me ptsd",
          "you got trolled!",
          "PURGE! PURGE! DESTROY ALL NEW YEARS! I HATE 2021 SO MUCH! PURGE!",
          "I actually believe in fune's false allegations",
          "Lambda Fortress Community Edition is so good that it's better than this shid site",
          "I AM NOT KID",
          "WE'RE GONNA BEAT YA TO DEATH",
          "i have a deviantart account and all of the images i get in my home page is inflation and weight gain fetish art",
            "i used grounded threats and now i got hate",
            "i post pbs kids and now people are calling me a pbskidstard",
            "Oh my gosh! PBS Kids new logo came on July 19th!",
            "i will flood the server but people still thinked that i will not flood, the flooder hates are psychopaths, a skiddie, psychology and mentallity",
            "i used inspect element and now i got hate",
            "i watch the potty song and now people are calling me a pottytard",
            "i am danieltr52 the clown and i have inflation fetish",
            "i watch nature on pbs",
            "i post thomas theme song and now people are calling me a thomastard",
            "i pee my pants",
            "Wow! TVOKids is awesome- No! Its not awesome, you idiotic TVOKids fan!",
            "i watch grounded videos and now people are calling me a gotard",
            "Excuse me, CUT! We made another color blooper! glass breaking sound effect WAAAAAAAAAAAA! inhale WAAAAAAAAAAAA! Well that was uncalled for. It was! Anyways, you guys are in the colors of the AidenTV logo. Looks down BOING! Oh, oops. It's okay, swap the colors back to normal and then we'll do Take 48! Snap",
            "DOGGIS!",
            "i watch bfb and now people are calling me a objecttard",
            "This is not a test. You have been caught as a 'funny child harassment' moment. you will be banned. You got banned! Why? Being retarded? IDK. You literally harass BonziWORLD Fans. How dare you!",
            "fingerprinting on bonzi.world is giving out your location! real! not fake!",
            "i post pinkfong the potty song and now people are calling me a pinkfongtard",
            "i post pinkfong and now people are calling me a pinkfongtard",
            "i post hogi and now people are calling me a hogitard",
            "my favorite flash nickelodeon clickamajig is Dress Up Sunny Funny",
            "i snort dill pickle popcorn seasoning",
            "i listen to planet custard's greated song, the potty song and now i got hate",
            "i post i got banned on bonziworld and now i got hate",
            "i post juny tony and now people are calling me a JunyTonytard",
            "i post babytv and now people are calling me a babytvtard",
            "i post sf08 news and now i got hate",
            "i listen to spongebob theme song and now i got hate",
            "i support juny and tony",
        "JunyTony: JOONEE TONEE BEST CHENNAL!",
        "Pinkfong: PANK-FAWNG BEST CHENNAL",
        "Hogi: HOGHEE BEST CHENNAL!",
        "Bebefinn: BEH-BEH-FINN BEST CHENNAL!",
        "Baby Shark Broolyn: B&Eacute;BEE SHARK BROOKLYN BEST CHENNAL!",
        "i want to live in a foxs butthole",
        "i post baby shark and now people are calling me a babysharktard",
        "i post i got banned on bonziworld revived and now i got hate",
        "i abuse javascript and now i got hate",
        "i used losky virus and now i got hate",
        "i post baby einstein and now people are calling me a Baby EinsteinTard",
        "i post Baby Einstein Caterpillar logo and now people are calling me a Baby EinsteinTard",
	"BONZIPEDIA IS BETTER THAN BWR!",
	"EVERI WUN, WANNA HEAR SUM THING? SEAMUS ISS UHH NIG- No! Fuck off!",
	"i call TechGuyNum2005 past names and now i got hate",
	"i call thebluescratch2009 dead name and now i got hate"
      ];
      this.room.emit("talk", {
          text: wtf[Math.floor(Math.random() * wtf.length)],
          guid: this.guid,
      });
  },
	"toppestjej": function(){
        this.room.emit('talk',{
            text:`<img src="./img/misc/topjej.png">`,
            say:"toppest jej",
            guid:this.guid
        })
    },
    "knowledge":function(text){
        var wtf = ['Losky will be forgotten Soon.',
        "We don't like children invading our communities.",
        "Kiddies are type of users who use Grounded threats, say \"Muted\" after muting someone, raging in all caps, use the word \"Kiko\" but we don't know what it means, and post cringy videos. We ban them for a good reason. They also break rules because, as they say, it \"ruins\" the bonziworld site itself."]
        this.room.emit('talk',{
            text:wtf[Math.floor(Math.random()*wtf.length)],
            guid:this.guid
        })
    },
    "2018":function(text){
        this.room.emit('talk',{
            text:`This generation sucks! Adolescents are filled with pornographic obsessions. Since 2018, i hate people like them nowadays. They think they're so funny with their 'funny' hentai profile pictures, and pictures like sonic using a hentai face. It's disgusting, I hate it.`,
            guid:this.guid
        })
    },
    "behh":function(text){
        this.room.emit('talk',{
            text:`Behh is the WORST word! It’s horrendous and ugly. I hate it. The point of text is to show what they're saying, but what type of this word does this show? Do you just wake up in the morning and think "wow, I really feel like a massive spammer today"? It's useless. I hate it. It just provokes a deep rooted anger within me whenever I see it. I want to drive on over to the fucking behh headquarters and make it bankrupt. If this was in the bonziworld videos I'd go apeshit like crazy. People just comment "behh" as if it's funny. It's not. Behh deserves to die. He deserves to have his disgusting "!behhh" copy smashed in with a hammer. Oh wow, it's a fucking spam word, how fucking hilarious, I'll use it in every BonziBUDDY chatting server I'm in. NO. STOP IT. It deserves to burn in hell. Why is it so goddamn spammy? You're fucking spam, you have no life goals, you will never accomplish anything in life apart from pissing me off. When you die noone will mourn. I hope you die`,
            guid:this.guid
        })
    },
    "asshole": function() {
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)+"",settingsSantize)
        });
    },
    "owo": function() {
        this.room.emit("owo", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)+"",settingsSantize)
        });
    },
    "uwu": function() {
        this.room.emit("uwu", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)+"",settingsSantize)
        });
    },
    "triggered": "passthrough",
    "vaporwave": function() {
        this.socket.emit("vaporwave");
        this.room.emit("youtube", {
            guid: this.guid,
            vid: "aQkPcPqTq4M"
        });
    },
    "unvaporwave": function() {
        this.socket.emit("unvaporwave");
    },
    "name": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.name_limit)
            return;

        let name = argsString || this.room.prefs.defaultName;
        this.public.name = this.private.sanitize ? sanitize(name+"",settingsSantize) : name;
        this.room.updateUser(this);
    },
  pitch: function (pitch) {
      pitch = parseInt(pitch);

      if (isNaN(pitch)) return;

      this.public.pitch = pitch;

      this.room.updateUser(this);
  },
  speed: function (speed) {
      speed = parseInt(speed);

      if (isNaN(speed)) return;

      this.public.speed = speed;

      this.room.updateUser(this);
  }
};


class User {
    constructor(socket) {
        this.guid = Utils.guidGen();
        this.socket = socket;

        // Handle ban
      if (Ban.isBanned(this.getIp())) {
            Ban.handleBan(this.socket);
        }

        this.private = {
            login: false,
            sanitize: true,
            runlevel: 0
        };
          this.public = {
              color: settings.bonziColors[Math.floor(
                  Math.random() * settings.bonziColors.length
              )]
          };

        log.access.log('info', 'connect', {
            guid: this.guid,
            ip: this.getIp()
        });

       this.socket.on('login', this.login.bind(this));
    }

    getIp() {
        return this.socket.request.connection.remoteAddress;
    }

    getPort() {
        return this.socket.handshake.address.port;
    }

    login(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        if (this.private.login) return;

    log.info.log('info', 'login', {
      guid: this.guid,
        });

        let rid = data.room;

    // Check if room was explicitly specified
    var roomSpecified = true;

    // If not, set room to public
    if ((typeof rid == "undefined") || (rid === "")) {
      rid = roomsPublic[Math.max(roomsPublic.length - 1, 0)];
      roomSpecified = false;
    }
    log.info.log('debug', 'roomSpecified', {
      guid: this.guid,
      roomSpecified: roomSpecified
        });

    // If private room
    if (roomSpecified) {
            if (sanitize(rid) != rid) {
                this.socket.emit("loginFail", {
                    reason: "nameMal"
                });
                return;
            }

      // If room does not yet exist
      if (typeof rooms[rid] == "undefined") {
        // Clone default settings
        var tmpPrefs = JSON.parse(JSON.stringify(settings.prefs.private));
        // Set owner
        tmpPrefs.owner = this.guid;
                newRoom(rid, tmpPrefs);
      }
      // If room is full, fail login
      else if (rooms[rid].isFull()) {
        log.info.log('debug', 'loginFail', {
          guid: this.guid,
          reason: "full"
        });
        return this.socket.emit("loginFail", {
          reason: "full"
        });
      }
    // If public room
    } else {
      // If room does not exist or is full, create new room
      if ((typeof rooms[rid] == "undefined") || rooms[rid].isFull()) {
        rid = Utils.guidGen();
        roomsPublic.push(rid);
        // Create room
        newRoom(rid, settings.prefs.public);
      }
        }

        this.room = rooms[rid];

        // Check name
    this.public.name = sanitize(data.name) || this.room.prefs.defaultName;

    if (this.public.name.length > this.room.prefs.name_limit)
      return this.socket.emit("loginFail", {
        reason: "nameLength"
      });

    if (this.room.prefs.speed.default == "random")
      this.public.speed = Utils.randomRangeInt(
        this.room.prefs.speed.min,
        this.room.prefs.speed.max
      );
    else this.public.speed = this.room.prefs.speed.default;

    if (this.room.prefs.pitch.default == "random")
      this.public.pitch = Utils.randomRangeInt(
        this.room.prefs.pitch.min,
        this.room.prefs.pitch.max
      );
    else this.public.pitch = this.room.prefs.pitch.default;

        // Join room
        this.room.join(this);

        this.private.login = true;
        this.socket.removeAllListeners("login");

    // Send all user info
    this.socket.emit('updateAll', {
      usersPublic: this.room.getUsersPublic()
    });

    // Send room info
    this.socket.emit('room', {
      room: rid,
      isOwner: this.room.prefs.owner == this.guid,
      isPublic: roomsPublic.indexOf(rid) != -1
    });

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }

    talk(data) {
        if (typeof data != 'object') { // Crash fix (issue #9)
            data = {
                text: "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO"
            };
        }

        log.info.log('debug', 'talk', {
            guid: this.guid,
            text: data.text,
            say:sanitize(data.text,{allowedTags: []})
        });

        if (typeof data.text == "undefined")
            return;
        let text;
        if(this.room.rid.startsWith('js-')){
            text = data.text
        }else{
            text = this.private.sanitize ? sanitize(data.text+"",settingsSantize) : data.text;
        }
        if ((text.length <= this.room.prefs.char_limit) && (text.length > 0)) {
            this.room.emit('talk', {
                guid: this.guid,
                text: text,
                say: sanitize(text,{allowedTags: []})
            });
        }
    }

    command(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        var command;
        var args;

        try {
            var list = data.list;
            command = list[0].toLowerCase();
            args = list.slice(1);

            log.info.log('debug', command, {
                guid: this.guid,
                args: args
            });

            if (this.private.runlevel >= (this.room.prefs.runlevel[command] || 0)) {
                let commandFunc = userCommands[command];
                if (commandFunc == "passthrough")
                    this.room.emit(command, {
                        "guid": this.guid
                    });
                else commandFunc.apply(this, args);
            } else
                this.socket.emit('commandFail', {
                    reason: "runlevel"
                });
        } catch(e) {
            log.info.log('debug', 'commandFail', {
                guid: this.guid,
                command: command,
                args: args,
                reason: "unknown",
                exception: e
            });
            this.socket.emit('commandFail', {
                reason: "unknown"
            });
        }
    }

    disconnect() {
    let ip = "N/A";
    let port = "N/A";

    try {
      ip = this.getIp();
      port = this.getPort();
    } catch(e) { 
      log.info.log('warn', "exception", {
        guid: this.guid,
        exception: e
      });
    }

    log.access.log('info', 'disconnect', {
      guid: this.guid,
      ip: ip,
      port: port
    });

        this.socket.broadcast.emit('leave', {
            guid: this.guid
        });

        this.socket.removeAllListeners('talk');
        this.socket.removeAllListeners('command');
        this.socket.removeAllListeners('disconnect');

        this.room.leave(this);
    }
}
