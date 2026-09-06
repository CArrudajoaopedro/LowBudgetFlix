#include <iostream>
#include <string>
#include <filesystem>
#include <vector>
#include <algorithm>
#include <fstream>
#include <sstream>
#include <pqxx/pqxx>
#include <cstdlib>

namespace fs = std::filesystem;

int main()
{
    try
    {    
        const char * connection_str = std::getenv("DATABASE_URL");
        if (connection_str == nullptr)
        {
            std::cerr << "String de conexão não encontrada\n";
            return 1;
        }
        pqxx::connection cx(connection_str);
        pqxx::work tx(cx);
        std::string path = "./migrations";
        std::vector<std::string> file_paths;
        for (const auto& entry : fs::directory_iterator(path))
        {
            file_paths.push_back(fs::relative(entry.path()));
        }
        std::sort(file_paths.begin(), file_paths.end());
        for (std::string &s : file_paths)
        {
            std::ifstream file(s);
            if (!file.is_open()) 
            {
                std::cerr << "Falha ao abrir o arquivo " << s << " \n";
                return 1;
            }
            std::stringstream buffer;
            buffer << file.rdbuf();
            std::string query = buffer.str();
            std::cout << "Executando migration em " << s << '\n' << std::flush;
            tx.exec(query);
        }
        tx.commit();
    }
    catch (std::exception const &e)
    {
        std::cerr << e.what() << std::endl;
        return 1;
    }
    return 0;
}