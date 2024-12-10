<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\Projekt_accessRepositoryInterface;

class Projekt_accessController extends Controller
{
    protected Projekt_accessRepositoryInterface $projekt_accessRepository;
    protected Request $request;

    public function __construct(Projekt_accessRepositoryInterface $projekt_accessRepository, Request $request)
    {
        $this->projekt_accessRepository = $projekt_accessRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->projekt_accessRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="projekt_access.csv"');
            $rows = $payload['rows'];
            $fields = array('id','Zugriffsebene',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['level'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->projekt_accessRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->projekt_accessRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->projekt_accessRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->projekt_accessRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->projekt_accessRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->projekt_accessRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

