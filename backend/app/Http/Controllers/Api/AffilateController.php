<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\AffilateRepositoryInterface;

class AffilateController extends Controller
{
    protected AffilateRepositoryInterface $affilateRepository;
    protected Request $request;

    public function __construct(AffilateRepositoryInterface $affilateRepository, Request $request)
    {
        $this->affilateRepository = $affilateRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->affilateRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="affilate.csv"');
            $rows = $payload['rows'];
            $fields = array('id',
        'werbende','geworbene',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],
        $row['werbende'],$row['geworbene'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->affilateRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->affilateRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->affilateRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->affilateRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->affilateRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->affilateRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

