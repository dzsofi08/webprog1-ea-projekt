<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $pdo = new PDO('mysql:host=localhost;dbname=ea_beadando', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'hiba tortent: ' . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    $stmt = $pdo->query("SELECT * FROM mozik");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
}
else if ($method === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO mozik (nev, varos, ferohely) VALUES (:nev, :varos, :ferohely)");
    $stmt->execute([
        ':nev' => $data['nev'],
        ':varos' => $data['varos'],
        ':ferohely' => $data['ferohely']
    ]);
    
    echo "OK";
}
else if ($method === "DELETE") {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("DELETE FROM mozik WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);
    echo "OK";
}
else if ($method === "PUT") {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE mozik SET nev = :nev, varos = :varos, ferohely = :ferohely WHERE id = :id");
    $stmt->execute([
        ':nev' => $data['nev'],
        ':varos' => $data['varos'],
        ':ferohely' => $data['ferohely'],
        ':id' => $data['id']
    ]);
    
    echo "OK";
}
else die("405");
