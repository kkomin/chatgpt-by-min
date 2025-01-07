import FormCard from "./FormCard";

export default function SignUpForm() {
    return (
    <FormCard 
        title="회원가입" 
        footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}>
            <form>
                
            </form>
    </FormCard>
    );
}