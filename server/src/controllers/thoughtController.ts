import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughtData = await Thought.find()
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// GET a single thought by its _id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.id })
            .select('-__v')
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
export const createThought = async (req: Request, res: Response) => {
    try {
        const thoughtData = await Thought.create(req.body);
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

// PUT to update a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found'})
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// DELETE to remove a thought by its _id
export const deleteThought = async (req: Request , res: Response) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found'})
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}