<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\ProjektRepositoryInterface;

class ProjektController extends Controller
{
    protected ProjektRepositoryInterface $projektRepository;
    protected Request $request;

    public function __construct(ProjektRepositoryInterface $projektRepository, Request $request)
    {
        $this->projektRepository = $projektRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->projektRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="projekt.csv"');
            $rows = $payload['rows'];
            $fields = array('id','Bezeichnung','Webaddresse','API-Schlüssel','Login-Benutzername','Login-Passwort',
        'Status',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['name'],$row['url'],$row['apikey'],$row['username'],$row['password'],
        $row['status'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->projektRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->projektRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->projektRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->projektRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->projektRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->projektRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

