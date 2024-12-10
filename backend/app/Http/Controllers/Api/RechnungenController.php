<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\RechnungenRepositoryInterface;

class RechnungenController extends Controller
{
    protected RechnungenRepositoryInterface $rechnungenRepository;
    protected Request $request;

    public function __construct(RechnungenRepositoryInterface $rechnungenRepository, Request $request)
    {
        $this->rechnungenRepository = $rechnungenRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->rechnungenRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="rechnungen.csv"');
            $rows = $payload['rows'];
            $fields = array('id',
        'pv_invoice_id','projekt_id',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],
        $row['pv_invoice_id'],$row['projekt_id'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->rechnungenRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->rechnungenRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->rechnungenRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->rechnungenRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->rechnungenRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->rechnungenRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

