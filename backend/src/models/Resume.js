const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for this resume (e.g., Software Engineer)']
    },
    personalInfo: {
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' }
    },
    professionalSummary: {
        type: String,
        default: ''
    },
    experience: [{
        jobTitle: { type: String, required: true },
        employer: { type: String, required: true },
        city: { type: String },
        state: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
    }],
    education: [{
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String },
        city: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
    }],
    skills: [{
        type: String
    }],
    projects: [{
        title: { type: String, required: true },
        technologies: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        link: { type: String },
        description: { type: String }
    }],
    certifications: [{
        name: { type: String, required: true },
        issuingOrganization: { type: String },
        date: { type: Date },
        link: { type: String }
    }],
    languages: [{
        language: { type: String },
        proficiency: { type: String }
    }],
    templateType: {
        type: String,
        enum: ['ATS', 'Modern', 'Professional', 'Minimal', 'Corporate', 'Classic', 'Harvard', 'Executive'],
        default: 'Modern'
    },
    themeSettings: {
        primaryColor: { type: String, default: '#374151' },
        secondaryColor: { type: String, default: '#6B7280' },
        isAtsSafeMode: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);
