import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} GALO REACT Project. Todos os direitos reservados. 
            Desenvolvido por <strong><a href="https://www.jampamatos.jampa.br/" target="_blank" rel="noopener noreferrer">Jampa Matos</a></strong></p>
        </footer>
    );
};

export default Footer;
