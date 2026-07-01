const OpenAI = require("openai");
const Chat = require("../models/chat");
const { Messages } = require("openai/resources/chat/completions.js");



const askQuestion = async (req, res) => {
    try {
        console.log("NERW API KEY " + process.env.OPENAI_KEY);
        const client = new OpenAI({
            apiKey: process.env.OPENAI_KEY?.trim(),
            baseURL: "https://openrouter.ai/api/v1"
        });
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({
                success: false,
                message: "question is required"
            });
        }

        const response = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{
                role: "system",
                content: "you are a helpful teacher for beginner students .explain the answer in simplehinglish language with examples."
            },
            {
                role: "user",
                content: question
            }]
        });

        const answer = response.choices[0].message.content;

        // const response=await client.responses.create({
        //     model:"gpt-5.5",
        //     input:`you are a helpful teacher for begineer students.explain the answer in simple Hinglish Language with example.Question:${question}`
        // });

        // const answer=response.output_text;
        const chat = await Chat.create({ question, answer });
        res.status(201).json({
            success: true,
            message: "answer generated",
            data: chat
        });
    }
    catch (err) {
        console.log("ask question error", err);
        res.status(500).json({
            success: false,
            message: "failed to answer the question"
        });
    }
};

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: chats.length,
            data: chats
        });
    }
    catch (err) {
        console.log("unable to load chats", err);
        resw.status(500).json({
            success: false,
            message: "unable to get chat logs"
        });
    }
};

const deleteAllChats = async (req, res) => {
    try {
        await Chat.deleteMany();
        res.status(200).json({
            success: true,
            message: "all chats deleted"
        });
    }
    catch (err) {
        console.log("unable to delete chats", err);
        res.status(500).json({
            success: false,
            message: "unable to delete chats"
        });
    }
};

module.exports = { askQuestion, getAllChats, deleteAllChats };