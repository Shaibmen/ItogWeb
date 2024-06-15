import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const serviceId = 'service_rmxvk4i';
        const templateId = 'template_tw4am6i';
        const userId = 'xyG2cIpf1bcMts_dn';

        const emailData = {
            to_name: data.name,
            from_name: data.name,
            message: data.message,
            email: data.email
        };

        emailjs.send(serviceId, templateId, emailData, userId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Сообщение отправлено!');
                reset();
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Ошибка при отправке сообщения');
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input type="text" id="name" {...register('name', { required: true })} className={errors.name ? 'error' : ''}/>
                {errors.name && <p className="error-message">Поле обязательно для заполнения</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register('email', { required: true })} className={errors.email ? 'error' : ''}/>
                {errors.email && <p className="error-message">Поле обязательно для заполнения</p>}
            </div>
            <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <textarea id="message" {...register('message', { required: true })} className={errors.message ? 'error' : ''}></textarea>
                {errors.message && <p className="error-message">Поле обязательно для заполнения</p>}
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default ContactForm;