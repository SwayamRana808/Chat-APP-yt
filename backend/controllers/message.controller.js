import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    try {
     const {message}=req.body;
     const {id : receiverId}=req.params;
     const senderId=req.user._id;
     let conversation =await Conversation.findOne({
       // ($all operator) is more flexible, allowing the array in the document to contain additional elements, while the second version(participants:[senderId,receiverId]) enforces an exact match of the array in the document with the specified array.
        participants:{$all:[senderId,receiverId]}
     })
     if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
     }
     const newMessage=new Message({
        senderId,
        receiverId,
        message
     })

    //  if(newMessage){
    //     conversation.messages.push(newMessage._id)
    //  }
    //  await conversation.save()  // as we updated conversation we have to save it
    // or below code
    if(newMessage){
        await Conversation.updateOne(
            { _id: conversation._id },
            { $push: { messages: newMessage._id } }
          );
    }
    //socket IO functionality here 
   
     await newMessage.save();

     res.status(201).json(newMessage);
    }catch(e){
        console.log("error in send message controller ",e.message)
        res.status(500).json({error:"internal server error"})

    }
    console.log("message send",req.params.id)
}
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages"); //not refference but actual message
        if(!conversation){
            return res.status(200).json([]);
        }
        
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("error in send message controller ",e.message)
        res.status(500).json({error:"internal server error"})

    }
}