/*eslint-disable*/

import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {

    const firebaseErrors = (error)=>{
        switch(error.code){
            case 'auth/app-deleted': toast.warn('O banco de dados não foi localizado.');
            case 'auth/expired-action-code': toast.warn('O código da ação o ou link expirou,');
            case 'auth/invalid-action-code': toast.warn('O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado,');
            case 'auth/user-disabled': toast.warn('O usuário correspondente à credencial fornecida foi desativado,');
            case 'auth/user-not-found': toast.warn('O usuário não correponde à nenhuma credencial,');
            case 'auth/weak-password': toast.warn('A senha é muito fraca,');
            case 'auth/email-already-in-use': toast.warn('Já existi uma conta com o endereço de email fornecido,');
            case 'auth/invalid-email': toast.warn('O endereço de e-mail não é válido,');
            case 'auth/operation-not-allowed': toast.warn('O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada,');
            case 'auth/account-exists-with-different-credential': toast.warn('E-mail já associado a outra conta,');
            case 'auth/auth-domain-config-required': toast.warn('A configuração para autenticação não foi fornecida,');
            case 'auth/credential-already-in-use': toast.warn('Já existe uma conta para esta credencial,');
            case 'auth/operation-not-supported-in-this-environment': toast.warn('Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https,');
            case 'auth/timeout': toast.warn('Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações,');
            case 'auth/missing-android-pkg-name': toast.warn('Deve ser fornecido um nome de pacote para instalação do aplicativo Android,');
            case 'auth/missing-continue-uri': toast.warn('A próxima URL deve ser fornecida na solicitação,');
            case 'auth/missing-ios-bundle-id': toast.warn('Deve ser fornecido um nome de pacote para instalação do aplicativo iOS,');
            case 'auth/invalid-continue-uri': toast.warn('A próxima URL fornecida na solicitação é inválida,');
            case 'auth/unauthorized-continue-uri': toast.warn('O domínio da próxima URL não está na lista de autorizações,');
            case 'auth/invalid-dynamic-link-domain': toast.warn('O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual,');
            case 'auth/argument-error': toast.warn('Verifique a configuração de link para o aplicativo,');
            case 'auth/invalid-persistence-type': toast.warn('O tipo especificado para a persistência dos dados é inválido,');
            case 'auth/unsupported-persistence-type': toast.warn('O ambiente atual não suportar o tipo especificado para persistência dos dados,');
            case 'auth/invalid-credential': toast.warn('A credencial expirou ou está mal formada,');
            case 'auth/wrong-password': toast.warn('Senha incorreta,');
            case 'auth/invalid-verification-code': toast.warn('O código de verificação da credencial não é válido,');
            case 'auth/invalid-verification-id': toast.warn('O ID de verificação da credencial não é válido,');
            case 'auth/custom-token-mismatch': toast.warn('O token está diferente do padrão solicitado,');
            case 'auth/invalid-custom-token': toast.warn('O token fornecido não é válido,');
            case 'auth/invalid-email': toast.warn('O endereço de e-mail não é válido,');
            case 'auth/captcha-check-failed': toast.warn('O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido,');
            case 'auth/invalid-phone-number': toast.warn('O número de telefone está em um formato inválido (padrão E.164),');
            case 'auth/missing-phone-number': toast.warn('O número de telefone é requerido,');
            case 'auth/quota-exceeded': toast.warn('A cota de SMS foi excedida,');
            case 'auth/cancelled-popup-request': toast.warn('Somente uma solicitação de janela pop-up é permitida de uma só vez,');
            case 'auth/popup-blocked': toast.warn('A janela pop-up foi bloqueado pelo navegador,');
            case 'auth/popup-closed-by-user': toast.warn('A janela pop-up foi fechada pelo usuário sem concluir o login no provedor,');
            case 'auth/unauthorized-domain': toast.warn('O domínio do aplicativo não está autorizado para realizar operações,');
            case 'auth/invalid-user-token': toast.warn('O usuário atual não foi identificado,');
            case 'auth/user-token-expired': toast.warn('O token do usuário atual expirou,');
            case 'auth/null-user': toast.warn('O usuário atual é nulo,');
            case 'auth/app-not-authorized': toast.warn('Aplicação não autorizada para autenticar com a chave informada,');
            case 'auth/invalid-api-key': toast.warn('A chave da API fornecida é inválida,');
            case 'auth/network-request-failed': toast.warn('Falha de conexão com a rede,');
            case 'auth/requires-recent-login': toast.warn('O último horário de acesso do usuário não atende ao limite de segurança,');
            case 'auth/too-many-requests': toast.warn('As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo,');
            case 'auth/web-storage-unsupported': toast.warn('O navegador não suporta armazenamento ou se o usuário desativou este recurso,');
            case 'auth/invalid-claims': toast.warn('Os atributos de cadastro personalizado são inválidos,');
            case 'auth/claims-too-large': toast.warn('O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte,');
            case 'auth/id-token-expired': toast.warn('O token informado expirou,');
            case 'auth/id-token-revoked': toast.warn('O token informado perdeu a validade,');
            case 'auth/invalid-argument': toast.warn('Um argumento inválido foi fornecido a um método,');
            case 'auth/invalid-creation-time': toast.warn('O horário da criação precisa ser uma data UTC válida,');
            case 'auth/invalid-disabled-field': toast.warn('A propriedade para usuário desabilitado é inválida,');
            case 'auth/invalid-display-name': toast.warn('O nome do usuário é inválido,');
            case 'auth/invalid-email-verified': toast.warn('O e-mail é inválido,');
            case 'auth/invalid-hash-algorithm': toast.warn('O algoritmo de HASH não é uma criptografia compatível,');
            case 'auth/invalid-hash-block-size': toast.warn('O tamanho do bloco de HASH não é válido,');
            case 'auth/invalid-hash-derived-key-length': toast.warn('O tamanho da chave derivada do HASH não é válido,');
            case 'auth/invalid-hash-key': toast.warn('A chave de HASH precisa ter um buffer de byte válido,');
            case 'auth/invalid-hash-memory-cost': toast.warn('O custo da memória HASH não é válido,');
            case 'auth/invalid-hash-parallelization': toast.warn('O carregamento em paralelo do HASH não é válido,');
            case 'auth/invalid-hash-rounds': toast.warn('O arredondamento de HASH não é válido,');
            case 'auth/invalid-hash-salt-separator': toast.warn('O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido,');
            case 'auth/invalid-id-token': toast.warn('O código do token informado não é válido,');
            case 'auth/invalid-last-sign-in-time': toast.warn('O último horário de login precisa ser uma data UTC válida,');
            case 'auth/invalid-page-token': toast.warn('A próxima URL fornecida na solicitação é inválida,');
            case 'auth/invalid-password': toast.warn('A senha é inválida, precisa ter pelo menos 6 caracteres,');
            case 'auth/invalid-password-hash': toast.warn('O HASH da senha não é válida,');
            case 'auth/invalid-password-salt': toast.warn('O SALT da senha não é válido,');
            case 'auth/invalid-photo-url': toast.warn('A URL da foto de usuário é inválido,');
            case 'auth/invalid-provider-id': toast.warn('O identificador de provedor não é compatível,');
            case 'auth/invalid-session-cookie-duration': toast.warn('A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas,');
            case 'auth/invalid-uid': toast.warn('O identificador fornecido deve ter no máximo 128 caracteres,');
            case 'auth/invalid-user-import': toast.warn('O registro do usuário a ser importado não é válido,');
            case 'auth/invalid-provider-data': toast.warn('O provedor de dados não é válido,');
            case 'auth/maximum-user-count-exceeded': toast.warn('O número máximo permitido de usuários a serem importados foi excedido,');
            case 'auth/missing-hash-algorithm': toast.warn('É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários,');
            case 'auth/missing-uid': toast.warn('Um identificador é necessário para a operação atual,');
            case 'auth/reserved-claims': toast.warn('Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas,');
            case 'auth/session-cookie-revoked': toast.warn('O COOKIE da sessão perdeu a validade,');
            case 'auth/uid-alread-exists': toast.warn('O indentificador fornecido já está em uso,');
            case 'auth/email-already-exists': toast.warn('O e-mail fornecido já está em uso,');
            case 'auth/phone-number-already-exists': toast.warn('O telefone fornecido já está em uso,');
            case 'auth/project-not-found': toast.warn('Nenhum projeto foi encontrado,');
            case 'auth/insufficient-permission': toast.warn('A credencial utilizada não tem permissão para acessar o recurso solicitado,');
            case 'auth/internal-error': toast.warn('O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.');
        }        
    }

    return (
        <ErrorContext.Provider value={{ firebaseErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const ErrPTBR = () => {
    return useContext(ErrorContext);
};
