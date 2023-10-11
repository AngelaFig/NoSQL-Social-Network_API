const {Thought, User, Reaction} = require('../models');

const thoughtController = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
          const dbThoughtData = await Thought.find()
    
    
          res.json(dbThoughtData);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    //   get single thought by id
    async getSingleThought(req, res) {
        try {
          const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
          if (!thoughtData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(thoughtData);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    //  create a new thought 

    async createThought (req,res){
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet:{thoughts:Thought._id}},
                {new:true}
            );
            if (!dbUserData) {
                return res.status(404).json({message:"Post created, but no user found with that Id"});
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update a Thought by Id

    async updateThought (req,res) {
        try {
          const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {
              $set: req.body,
            },
            {
              new: true,
            }
          );
    
          res.json(dbThoughtData);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    //   Delete Thought by Id

    async deleteThought (req,res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            await User.findOneAndUpdate(
                {username: thought.usernmae},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            res.status(200).json({message: `Thought ${req.params.thoughtId} deleted. `});
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No user with this id!' });
        };
        res.json(dbThoughtData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    },

    // post reaction to thought
    async addReaction(req,res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {new:true}
            );
            if(!dbThoughtData){
                return res.status(400).json({message: `No thought with this id`});
            }
            res.json(dbThoughtData);
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Delete a reaction by reactionId

    async removeReaction(req,res){
        try {
            const dbReactionData = await Thought.findByIdAndUpdate(req.params.thoughtId,
                {$pull: {reactions:{reactionId: req.params.reactionId}}},
                {new:true})
                res.json({message: `Reaction ${req.params.reactionId} deleted. `})
        }catch(err){
            console.log(err)
            res.status(500).json(err); 
        }
        
    },

};

module.exports = thoughtController;