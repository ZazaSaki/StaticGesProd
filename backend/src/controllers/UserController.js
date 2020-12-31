const { update } = require('../models/User');
const User  = require('../models/User');

//index  : List users      ..done
//store  : save new user   ..done
//show   : show sepcific user
//update : exinsting user ..done
//destroy: delete an user

module.exports = {
    
    async update(req,res){
        //request
        const {email, id} = req.query;
        const {dayListItem} = req.body;
        
        //data base
        const {name, emailU, passU} = await User.findOne({email});
        let {dayList} = await User.findOne({email});

        //checking existing data
        const index = dayList.findIndex(e => (e.id == id));

        if(index > -1){
            dayList[index] = dayListItem;
        }else{
            dayList = [...dayList, dayListItem]
        }
        
        //updating user
        const user = await User.updateOne({email}, {dayList});

        return res.json(user);
    },

    async index(req,res){
        const users = await User.find();
        return res.json(users);
    },
    
    async store(req, res){
        //request
        const {name, pass, email, dayList} = req.body;
        
        //checking existing data
        let user = await User.findOne({email});
        user = user ? user : await User.findOne({name});

        if (!user) {
            
            //adding user
            user = await User.create({
                name,
                pass,
                email,
                dayList,
            });
        }

        
        
        return res.json(user);
    }
}