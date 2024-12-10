<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\KundeRepositoryInterface;

class KundeController extends Controller
{
    protected KundeRepositoryInterface $kundeRepository;
    protected Request $request;

    public function __construct(KundeRepositoryInterface $kundeRepository, Request $request)
    {
        $this->kundeRepository = $kundeRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->kundeRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="kunde.csv"');
            $rows = $payload['rows'];
            $fields = array('id','name','vorname','strasse','plz','ort','land','partnernr','firma',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['name'],$row['vorname'],$row['strasse'],$row['plz'],$row['ort'],$row['land'],$row['partnernr'],$row['firma'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->kundeRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->kundeRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->kundeRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->kundeRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->kundeRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->kundeRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

