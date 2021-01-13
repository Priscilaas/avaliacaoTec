-- Questão 1 
CREATE TABLE dbo.Departamento (
    id_departamento int,
    nome_responsavel varchar(100),
    login_responsavel varchar(100),
    email_responsavel varchar(100)
);
Go
-- Questão 2 - Procedure para Adicionar ou Editar um departamento
    CREATE PROCEDURE dbo.SP_ADD_DEPARTAMENTO (@id_departamento BIGINT, @nome_responsavel BIGINT,@login_responsavel VARCHAR(100),@email_responsavel VARCHAR(100)
    )
    AS 
	BEGIN
        SET NOCOUNT ON;

        SELECT 
            id_departamento,
            nome_responsavel,
            login_responsavel,
            email_responsavel
        FROM Departamento
        WHERE
                id_departamento = @id_departamento

        -- Verificar se existir o departamento
        IF  @@ROWCOUNT <= 0
            INSERT INTO Departamento
                (id_departamento, nome_responsavel, login_responsavel, email_responsavel)
                VALUES(@id_departamento, @nome_responsavel, @login_responsavel, @email_responsavel);
        ELSE 
            UPDATE Departamento
            SET nome_responsavel = @nome_responsavel, login_responsavel = @login_responsavel, email_responsavel = @email_responsavel
            WHERE id_departamento = @id_departamento
	END

-----------------------
exec dbo.[SP_ADD_DEPARTAMENTO];