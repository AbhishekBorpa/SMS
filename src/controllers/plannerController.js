const asyncHandler = require('express-async-handler');
const LessonPlan = require('../models/LessonPlan');
const { logAction } = require('./auditController');

// @desc    Get teacher's lesson plans
// @route   GET /api/planner
// @access  Private (Teacher)
const getLessonPlans = asyncHandler(async (req, res) => {
    const plans = await LessonPlan.find({ teacher: req.user._id, school: req.schoolId }).sort({ date: 1 });
    res.json(plans);
});

// @desc    Create a lesson plan
// @route   POST /api/planner
// @access  Private (Teacher)
const addLessonPlan = asyncHandler(async (req, res) => {
    const { date, subject, className, topic, objectives, materialsNeeded } = req.body;

    const plan = await LessonPlan.create({
        teacher: req.user._id,
        date,
        subject,
        className,
        topic,
        objectives,
        materialsNeeded,
        school: req.schoolId
    });

    if (plan) {
        await logAction({
            action: 'ADD_LESSON_PLAN',
            entity: 'LessonPlan',
            entityId: plan._id,
            details: { topic, className },
            performedBy: req.user._id,
            req
        });
        res.status(201).json(plan);
    } else {
        res.status(400);
        throw new Error('Invalid plan data');
    }
});

// @desc    Update lesson plan status/reflection
// @route   PUT /api/planner/:id
// @access  Private (Teacher)
const updateLessonPlan = asyncHandler(async (req, res) => {
    const plan = await LessonPlan.findOne({ _id: req.params.id, school: req.schoolId });

    if (plan && plan.teacher.toString() === req.user._id.toString()) {
        plan.status = req.body.status || plan.status;
        plan.reflection = req.body.reflection || plan.reflection;

        // Allow updating other fields if needed
        plan.topic = req.body.topic || plan.topic;
        plan.objectives = req.body.objectives || plan.objectives;

        const updatedPlan = await plan.save();
        res.json(updatedPlan);
    } else {
        res.status(404);
        throw new Error('Plan not found or unauthorized');
    }
});

// @desc    Delete a lesson plan
// @route   DELETE /api/planner/:id
// @access  Private (Teacher)
const deleteLessonPlan = asyncHandler(async (req, res) => {
    const plan = await LessonPlan.findOne({ _id: req.params.id, school: req.schoolId });

    if (plan && plan.teacher.toString() === req.user._id.toString()) {
        await plan.deleteOne();
        res.json({ message: 'Lesson plan removed' });
    } else {
        res.status(404);
        throw new Error('Plan not found or unauthorized');
    }
});

module.exports = {
    getLessonPlans,
    addLessonPlan,
    updateLessonPlan,
    deleteLessonPlan,
};
