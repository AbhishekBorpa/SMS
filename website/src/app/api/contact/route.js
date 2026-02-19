import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Here you would typically send an email or save to a database
        // For now, we'll log it and pretend it was successful
        console.log('Contact Form Submission:', { name, email, message });

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
