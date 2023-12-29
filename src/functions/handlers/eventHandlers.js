const fs = require("fs");

module.exports = (client) =>{
    client.eventHandlers = async()=>{
        const folderPath = './src/events';
        const eventsFolder = fs.readdirSync(folderPath);

        for(const folder of eventsFolder){
            const eventsFiles = fs.readdirSync(`./src/events/${folder}`).filter((file)=>file.endsWith('.js'));

            switch (folder) {
                case "client":
                    for(const file of eventsFiles){
                        const event  = require(`../../events/${folder}/${file}`);
                        if(event.on) {client.once(event.name,(...args)=>event.execute(...args,client))}else{
                            client.on(event.name,(...args)=>event.execute(...args,client));
                        }
                    }
                    break;
            
                default:
                    break;
            }


        }
    }
}