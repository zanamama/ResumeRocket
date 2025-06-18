import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    console.log(`Attempting to send email to: ${params.to}`);
    console.log(`From: ${params.from}`);
    console.log(`Subject: ${params.subject}`);
    
    const response = await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    
    console.log('Email sent successfully:', response[0]?.statusCode);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', {
      message: error.message,
      code: error.code,
      response: error.response?.body
    });
    return false;
  }
}

export async function sendResumeCompletionEmail(
  userEmail: string,
  jobId: number,
  mode: 'standard' | 'advanced' | 'create',
  downloadUrl?: string
): Promise<boolean> {
  const subject = mode === 'standard' 
    ? 'Your Resume Optimization is Complete!' 
    : mode === 'advanced'
      ? 'Your Job-Tailored Resumes are Ready!'
      : 'Your Custom Resume is Complete!';
    
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #007AFF; font-size: 28px; margin: 0;">UpMySalary</h1>
        <p style="color: #666; margin: 5px 0;">Resume Optimization Complete</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #333; font-size: 24px; margin: 0 0 20px 0;">Great news! Your ${mode === 'standard' ? 'optimized resume' : 'tailored resumes'} ${mode === 'standard' ? 'is' : 'are'} ready.</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          ${mode === 'standard' 
            ? 'Your resume has been professionally optimized with enhanced phrasing, better structure, and compelling metrics.'
            : 'Your resume has been tailored to match specific job requirements with optimized keywords and relevant experience highlighting.'
          }
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl ? `https://upmysalary.com${downloadUrl}` : `https://upmysalary.com/success/${jobId}`}" 
             style="background: #007AFF; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; display: inline-block;">
            Download Your ${mode === 'standard' ? 'Resume' : 'Resumes'}
          </a>
        </div>
      </div>
      
      <div style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
        <p>Need help? Contact us at <a href="mailto:support@upmysalary.com" style="color: #007AFF;">support@upmysalary.com</a></p>
        <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} UpMySalary. All rights reserved.</p>
      </div>
    </div>
  `;

  const text = `
Your ${mode === 'standard' ? 'optimized resume is' : 'tailored resumes are'} ready!

${mode === 'standard' 
  ? 'Your resume has been professionally optimized with enhanced phrasing, better structure, and compelling metrics.'
  : 'Your resume has been tailored to match specific job requirements with optimized keywords and relevant experience highlighting.'
}

Download your ${mode === 'standard' ? 'resume' : 'resumes'}: ${downloadUrl ? `https://upmysalary.com${downloadUrl}` : `https://upmysalary.com/success/${jobId}`}

Need help? Contact us at support@upmysalary.com

© ${new Date().getFullYear()} UpMySalary. All rights reserved.
  `;

  return await sendEmail({
    to: userEmail,
    from: 'noreply@upmysalary.replit.app', // Using project domain
    subject,
    text,
    html
  });
}

export async function sendWelcomeEmail(userEmail: string): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #007AFF; font-size: 28px; margin: 0;">Welcome to UpMySalary!</h1>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #333; font-size: 24px; margin: 0 0 20px 0;">Thanks for using our resume optimizer!</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          We're processing your resume and will send you a notification email once it's ready. This usually takes less than 60 seconds.
        </p>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
          In the meantime, feel free to explore our other features or contact us if you have any questions.
        </p>
      </div>
      
      <div style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
        <p>Need help? Contact us at <a href="mailto:support@upmysalary.com" style="color: #007AFF;">support@upmysalary.com</a></p>
        <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} UpMySalary. All rights reserved.</p>
      </div>
    </div>
  `;

  const text = `
Welcome to UpMySalary!

Thanks for using our resume optimizer! We're processing your resume and will send you a notification email once it's ready. This usually takes less than 60 seconds.

In the meantime, feel free to explore our other features or contact us if you have any questions.

Need help? Contact us at support@upmysalary.com

© ${new Date().getFullYear()} UpMySalary. All rights reserved.
  `;

  return await sendEmail({
    to: userEmail,
    from: 'support@upmysalary.com',
    subject: 'Welcome to UpMySalary - Resume Processing Started',
    text,
    html
  });
}