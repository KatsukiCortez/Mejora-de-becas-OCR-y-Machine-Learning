import { useForm } from 'react-hook-form';
import './RegisterPage.css'; // Archivo CSS para estilos personalizados

function RegisterPage() {
    const { register, handleSubmit } = useForm();

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit((values) => {console.log(values)})}>
                    <input
                        type="text"
                        {...register("fullName", { required: true })}
                        className="input-field"
                        placeholder="Nombre Completo"
                    />
                    <input
                        type="email"
                        {...register("gmail", { required: true })}
                        className="input-field"
                        placeholder="G-mail"
                    />
                    <input
                        type="text"
                        {...register("dni", { required: true })}
                        className="input-field"
                        placeholder="DNI"
                    />
                    <input
                        type="text"
                        {...register("userName", { required: true })}
                        className="input-field"
                        placeholder="Usuario"
                    />
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="input-field"
                        placeholder="Contraseña"
                    />
                    <button type='submit' className="submit-btn">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
