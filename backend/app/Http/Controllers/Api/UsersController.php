<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Config\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;
use App\Repositories\UsersRepositoryInterface;

class UsersController extends Controller
{
    private Repository $config;
    protected UsersRepositoryInterface $usersRepository;
    protected Request $request;

    public function __construct(UsersRepositoryInterface $usersRepository, Request $request, Repository $config)
    {
        $this->usersRepository = $usersRepository;
        $this->request = $request;
        $this->config = $config;
        $this->middleware('auth:api')
            ->except(['signinGoogle', 'callbackGoogle', 'verifyEmail', 'sendVerifyEmail']);
    }

    public function signinGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callbackGoogle()
    {
        $socialUser = Socialite::driver('google')->stateless()->user();
        $user = Users::firstOrCreate(['google_id', $socialUser->id], [
            'firstName' => $socialUser->name,
            'email' => $socialUser->email,
            'google_id' => $socialUser->id,
            'password' => Hash::make('password'),
            'emailVerified' => true,
            'emailVerificationTokenExpiresAt' => Carbon::now(),
            'role' => 'admin'
        ]);

        Auth::login($user);

        return redirect($this->config->get('app.front_url') . '/#/login?token=' . auth()->login($user));
    }

    public function sendVerifyEmail()
    {
        return response();
    }

    public function verifyEmail(Request $request)
    {
        $user = Users::query()
            ->where('id', $request->id)
            ->where('emailVerificationToken', $request->hash)
            ->where('emailVerificationTokenExpiresAt', '<', Carbon::now()->addHour())
            ->first();

        if ($user) {
            $user->update(['emailVerified' => true, 'emailVerificationTokenExpiresAt' => Carbon::now()]);
            return redirect($this->config->get('app.front_url') . '/#/login?message=success');
        }

        return redirect($this->config->get('app.front_url') . '/#/login?message=success');
    }

    public function index()
    {
        $payload = $this->usersRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="users.csv"');
            $rows = $payload['rows'];
            $fields = array('id','Vorname','Nachname','Telefon','E-mail',
        'idusers',

      'registratedat',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['firstName'],$row['lastName'],$row['phoneNumber'],$row['email'],
        $row['idusers'],

      $row['registratedat'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->usersRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->usersRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->usersRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->usersRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->usersRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->usersRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

